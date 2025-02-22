using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.DTOs.Vehicle;
using API.Helpers.Email;
using API.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace API.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly MailSettings _mailSettings;
        public EmailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;

        }

        public async Task SendMaintenanceNotificationEmail(MaintenanceNotificationDto maintenanceNotification, string subject)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail));
            message.To.Add(new MailboxAddress("", maintenanceNotification.OwnerEmail));
            message.Subject = subject + " ⏰";

            var placeholders = new Dictionary<string, string>
            {
                {"Name", maintenanceNotification.OwnerName},
                {"Surname", maintenanceNotification.OwnerSurname},
                {"VehicleManufacturer", maintenanceNotification.Manufacturer},
                {"VehicleModel", maintenanceNotification.Model},
                {"VehicleYearOfManufacture", maintenanceNotification.YearOfManufacture},
                {"VehicleRegistrationPlate", maintenanceNotification.RegistrationPlate},
                {"Message", maintenanceNotification.NotificationMessage},
            };

            string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplates", "MaintenanceNotificationEmailTemplate.html");
            string emailBody = EmailTemplateHelper.GetEmailBody(templatePath, placeholders);

            var builder = new BodyBuilder
            {
                HtmlBody = emailBody,
            };
            message.Body = builder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_mailSettings.Server, _mailSettings.Port, SecureSocketOptions.StartTls).ConfigureAwait(false);
            await client.AuthenticateAsync(_mailSettings.Username, _mailSettings.Password).ConfigureAwait(false);
            await client.SendAsync(message).ConfigureAwait(false);
            await client.DisconnectAsync(true).ConfigureAwait(false);
        }

        public async Task SendUserEmailAsync(string to, string subject, string body)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail));
                message.To.Add(new MailboxAddress("", to));
                message.Subject = subject;

                var builder = new BodyBuilder
                {
                    HtmlBody = body
                };
                message.Body = builder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync(_mailSettings.Server, _mailSettings.Port, SecureSocketOptions.StartTls).ConfigureAwait(false);
                await client.AuthenticateAsync(_mailSettings.Username, _mailSettings.Password).ConfigureAwait(false);
                await client.SendAsync(message).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Greška pri slanju mejla: {ex.Message}\nStackTrace: {ex.StackTrace}");
            }
        }

        public async Task SendRegistrationNotificationEmail(RegistrationNotificationDto registrationNotification, string subject)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail));
                message.To.Add(new MailboxAddress("", registrationNotification.OwnerEmail));
                message.Subject = subject + " ⏰";

                var placeholders = new Dictionary<string, string>
                {
                    {"Name", registrationNotification.OwnerName},
                    {"Surname", registrationNotification.OwnerSurname},
                    {"VehicleManufacturer", registrationNotification.Manufacturer},
                    {"VehicleModel", registrationNotification.Model},
                    {"VehicleYearOfManufacture", registrationNotification.YearOfManufacture},
                    {"VehicleRegistrationPlate", registrationNotification.RegistrationPlate},
                    {"DaysUntilExpiration", registrationNotification.DaysUntilExpiration},
                    {"Message", registrationNotification.NotificationMessage},
                };

                string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplates", "RegistrationNotificationEmailTemplate.html");
                string emailBody = EmailTemplateHelper.GetEmailBody(templatePath, placeholders);

                var builder = new BodyBuilder
                {
                    HtmlBody = emailBody,
                };
                message.Body = builder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync(_mailSettings.Server, _mailSettings.Port, SecureSocketOptions.StartTls).ConfigureAwait(false);
                await client.AuthenticateAsync(_mailSettings.Username, _mailSettings.Password).ConfigureAwait(false);
                await client.SendAsync(message).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Greška pri slanju mejla: {ex.Message}\nStackTrace: {ex.StackTrace}");
            }
        }
    }
}