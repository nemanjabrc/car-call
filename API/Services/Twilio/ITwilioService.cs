using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.DTOs.Vehicle;

namespace API.Services.Twilio
{
    public interface ITwilioService
    {
        Task SendWhatsAppMessage(string toPhoneNumber, string messageBody);
        Task SendWhatsAppRegistrationNotification(RegistrationNotificationDto registrationNotification);
        Task SendWhatsAppMaintenanceNotification(MaintenanceNotificationDto maintenanceNotification);
    }
}