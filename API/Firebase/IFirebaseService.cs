using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;

namespace API.Firebase
{
    public interface IFirebaseService
    {
        Task SendPushNotification(string token, string title, string body);
        Task SendVehicleRegistrationPushNotification(string token, RegistrationNotificationDto registrationNotification);
        Task SendVehicleMaintenancePushNotification(string token, MaintenanceNotificationDto maintenanceNotification);
    }
}