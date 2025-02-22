using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.DTOs.Vehicle;

namespace API.Services.Email
{
    public interface IEmailService
    {
        Task SendUserEmailAsync(string to, string subject, string body);
        Task SendRegistrationNotificationEmail(RegistrationNotificationDto registrationNotification, string subject);
        Task SendMaintenanceNotificationEmail(MaintenanceNotificationDto maintenanceNotification, string subject);
    }
}