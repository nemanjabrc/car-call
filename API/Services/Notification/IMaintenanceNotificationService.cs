using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.Models;

namespace API.Services.Notification
{
    public interface IMaintenanceNotificationService
    {
        Task<ServiceResponse<List<GetMaintenanceNotificationDto>>> GetAllVehicleMaintenanceNotifications(int vehicleId);
        Task<ServiceResponse<GetMaintenanceNotificationDto>> GetSingleVehicleMaintenanceNotification(int notificationId);
        Task<ServiceResponse<GetMaintenanceNotificationDto>> AddMaintenanceNotification(int vehicleId, AddMaintenanceNotificationDto newMaintenanceNotification);
        Task<ServiceResponse<GetMaintenanceNotificationDto>> UpdateMaintenanceNotification(UpdateMaintenanceNotificationDto updatedMaintenanceNotification);
        Task<ServiceResponse<GetMaintenanceNotificationDto>> ResetMaintenanceNotification(int notificationId, int numberOfDays, DateTime startDate);
        Task<ServiceResponse<int>> DeleteMaintenanceNotification(int notificationId);
    }
}