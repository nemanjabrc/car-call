using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Notification;
using API.Firebase;
using API.Models;
using API.Services.Email;
using API.Services.Notification;
using API.Services.Twilio;
using Microsoft.EntityFrameworkCore;
using Quartz;

namespace API.BackgroundJobs.VehiclesDataFetch
{
    [DisallowConcurrentExecution]
    public class NotifyingAboutMaintenanceJob : IJob
    {
        private readonly DataContext _context;
        private readonly IEmailService _emailService;
        private readonly ITwilioService _twilioService;
        private readonly IMaintenanceNotificationService _maintenanceNotificationService;
        private readonly IFirebaseService _firebaseService;
        public NotifyingAboutMaintenanceJob(BackgroundJobsFetchContext context, IEmailService emailService,
            ITwilioService twilioService, IMaintenanceNotificationService maintenanceNotificationService, IFirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
            _maintenanceNotificationService = maintenanceNotificationService;
            _twilioService = twilioService;
            _emailService = emailService;
            _context = context;

        }
        public async Task Execute(IJobExecutionContext context)
        {
            var notificationDate = DateTime.Now.Date;

            await foreach (var notification in _context.MaintenanceNotifications
                .Where(n => n.DateOfNotification.Equals(notificationDate))
                .Include(n => n.Vehicle)
                    .ThenInclude(v => v.Owner)
                        .ThenInclude(o => o.FirebaseTokens)
                .Select(n => new
                {
                    n.Id,
                    n.Vehicle.Manufacturer,
                    n.Vehicle.Model,
                    n.Vehicle.YearOfManufacture,
                    n.Vehicle.RegistrationPlate,
                    n.Vehicle.Owner.Name,
                    n.Vehicle.Owner.Surname,
                    n.Vehicle.Owner.PhoneNumber,
                    n.Vehicle.Owner.Email,
                    n.Vehicle.Owner.NotificationService,
                    n.Message,
                    n.NumberOfDays,
                    n.Repetitive,
                    n.Vehicle.Owner.FirebaseTokens,
                })
                .AsAsyncEnumerable())
            {
                var maintenanceNotification = new MaintenanceNotificationDto
                {
                    Id = notification.Id,

                    Manufacturer = notification.Manufacturer,
                    Model = notification.Model,
                    YearOfManufacture = notification.YearOfManufacture,
                    RegistrationPlate = notification.RegistrationPlate,

                    OwnerName = notification.Name,
                    OwnerSurname = notification.Surname,
                    OwnerPhoneNumber = notification.PhoneNumber,
                    OwnerEmail = notification.Email,
                    NotificationService = (int)notification.NotificationService,

                    NotificationMessage = notification.Message,
                    NumberOfDays = notification.NumberOfDays,
                    Repetitive = notification.Repetitive,
                };

                Console.WriteLine("\nVozilo: " + maintenanceNotification.Manufacturer +
                    "\nModel: " + maintenanceNotification.Model +
                    "\nGodina: " + maintenanceNotification.YearOfManufacture +
                    "\nRegistarska oznaka: " + maintenanceNotification.RegistrationPlate +
                    "\nBroj telefona: " + maintenanceNotification.OwnerPhoneNumber +
                    "\nServis: " + maintenanceNotification.NotificationService +
                    "\nEmail: " + maintenanceNotification.OwnerEmail +
                    "\nPoruka: " + maintenanceNotification.NotificationMessage +
                    "\nPonoviti: " + maintenanceNotification.NotificationMessage + "\n\n");

                if (notification.FirebaseTokens.Count > 0)
                {
                    foreach (var token in notification.FirebaseTokens)
                    {
                        await _firebaseService.SendVehicleMaintenancePushNotification(token.Token, maintenanceNotification);
                    }
                }

                //Za svaki case unutar switch-a postavi da se provjeri da li je notifikacija Repetitive.
                //Ako jeste, treba da se azuriraju podaci o njoj nakon sto se poslje notifikacija.
                //Ako nije, treba da se izbrise iz baze nakon sto se posalje notifikacija

                switch (maintenanceNotification.NotificationService)
                {
                    case (int)NotificationType.EmailService:
                        await _emailService.SendMaintenanceNotificationEmail(maintenanceNotification, "Podsjetnik za održavanje");
                        if (maintenanceNotification.Repetitive)
                        {
                            await _maintenanceNotificationService.ResetMaintenanceNotification(maintenanceNotification.Id, maintenanceNotification.NumberOfDays, notificationDate);
                        }
                        else
                        {
                            await _maintenanceNotificationService.DeleteMaintenanceNotification(maintenanceNotification.Id);
                        }
                        break;

                    case (int)NotificationType.SMSService:
                        //Slanje podsjetnika putem SMS servisa
                        break;

                    case (int)NotificationType.WhatsAppService:
                        await _twilioService.SendWhatsAppMaintenanceNotification(maintenanceNotification);
                        if (maintenanceNotification.Repetitive)
                        {
                            await _maintenanceNotificationService.ResetMaintenanceNotification(maintenanceNotification.Id, maintenanceNotification.NumberOfDays, notificationDate);
                        }
                        else
                        {
                            await _maintenanceNotificationService.DeleteMaintenanceNotification(maintenanceNotification.Id);
                        }
                        break;

                    default:
                        return;
                }
            }
        }
    }
}