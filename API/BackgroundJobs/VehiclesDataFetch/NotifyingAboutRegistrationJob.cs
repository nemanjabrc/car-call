using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Notification;
using API.DTOs.Vehicle;
using API.Firebase;
using API.Models;
using API.Services.Email;
using API.Services.Notification;
using API.Services.Twilio;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Quartz;

namespace API.BackgroundJobs.VehiclesDataFetch
{
    [DisallowConcurrentExecution]
    public class NotifyingAboutRegistrationJob : IJob
    {
        private readonly DataContext _context;
        private readonly IEmailService _emailService;
        private readonly ITwilioService _twilioService;
        private readonly IRegistrationNotificationService _registrationNotificationService;
        private readonly IFirebaseService _firebaseService;
        public NotifyingAboutRegistrationJob(BackgroundJobsFetchContext context, IRegistrationNotificationService registrationNotificationService,
            IEmailService emailService, ITwilioService twilioService, IFirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
            _registrationNotificationService = registrationNotificationService;
            _twilioService = twilioService;
            _emailService = emailService;
            _context = context;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var notificationDate = DateTime.Now.Date;
            var daysToCheck = new[] { 1, 7, 15, 30 };

            var targetDates = daysToCheck
                .Select(days => notificationDate.AddDays(days))
                .ToArray();

            await foreach (var vehicle in _context.Vehicles
                .Where(v => targetDates.Contains(v.DateOfExpiration))
                .Include(v => v.Owner)
                    .ThenInclude(o => o.Company)
                .Include(v => v.Owner)
                    .ThenInclude(o => o.FirebaseTokens)
                .Include(v => v.RegistrationNotification)
                .Select(v => new
                {
                    v.Id,
                    v.Manufacturer,
                    v.Model,
                    v.YearOfManufacture,
                    v.RegistrationPlate,
                    v.DateOfExpiration,
                    OwnerId = v.Owner.Id,
                    v.Owner.Name,
                    v.Owner.Surname,
                    v.Owner.PhoneNumber,
                    v.Owner.Email,
                    v.Owner.NotificationService,
                    v.RegistrationNotification.Message,
                    v.Owner.FirebaseTokens
                })
                .AsAsyncEnumerable())
            {
                string daysUntilExpiration;
                int numberOfDays = (vehicle.DateOfExpiration - DateTime.Now).Days + 1;
                if (numberOfDays == 1)
                {
                    daysUntilExpiration = numberOfDays.ToString() + " dan";
                }
                else
                {
                    daysUntilExpiration = numberOfDays.ToString() + " dana";
                }
                var registrationNotification = new RegistrationNotificationDto
                {
                    Id = vehicle.Id,
                    Manufacturer = vehicle.Manufacturer,
                    Model = vehicle.Model,
                    YearOfManufacture = vehicle.YearOfManufacture,
                    RegistrationPlate = vehicle.RegistrationPlate,
                    DateOfExpiration = vehicle.DateOfExpiration,

                    OwnerId = vehicle.OwnerId,
                    OwnerName = vehicle.Name,
                    OwnerSurname = vehicle.Surname,
                    OwnerPhoneNumber = vehicle.PhoneNumber,
                    OwnerEmail = vehicle.Email,
                    NotificationService = (int)vehicle.NotificationService,

                    NotificationMessage = vehicle.Message,
                    DaysUntilExpiration = daysUntilExpiration,

                };

                //Testno logovanje samo.
                Console.WriteLine("\nVozilo: " + registrationNotification.Manufacturer +
                    "\nModel: " + registrationNotification.Model +
                    "\nGodina: " + registrationNotification.YearOfManufacture +
                    "\nDatum isteka: " + registrationNotification.DateOfExpiration +
                    "\nBroj telefona: " + registrationNotification.OwnerPhoneNumber +
                    "\nServis: " + (NotificationType)registrationNotification.NotificationService +
                    "\nEmail: " + registrationNotification.OwnerEmail +
                    "\nPoruka: " + registrationNotification.NotificationMessage +
                    "\nIstice za: " + registrationNotification.DaysUntilExpiration + "\n\n");


                if (numberOfDays == 30)
                {
                    await _registrationNotificationService.SetRegistrationStatusToFalse(registrationNotification.Id);
                }

                if (vehicle.FirebaseTokens.Count > 0)
                {
                    foreach (var token in vehicle.FirebaseTokens)
                    {
                        await _firebaseService.SendVehicleRegistrationPushNotification(token.Token, registrationNotification);
                    }
                }

                switch (registrationNotification.NotificationService)
                {
                    case (int)NotificationType.EmailService:
                        await _emailService.SendRegistrationNotificationEmail(registrationNotification, "Podsjetnik za registraciju");
                        break;

                    case (int)NotificationType.SMSService:
                        //Slanje podsjetnika putem SMS servisa
                        break;

                    case (int)NotificationType.WhatsAppService:
                        await _twilioService.SendWhatsAppRegistrationNotification(registrationNotification);
                        break;

                    default:
                        return;
                }
            }

            await context.Scheduler.TriggerJob(new JobKey(nameof(NotifyingAboutMaintenanceJob)));
        }
    }
}