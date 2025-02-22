using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.Models;

namespace API.Services.Notification
{
    public interface IRegistrationNotificationService
    {
        Task<ServiceResponse<GetRegistrationNotificationDto>> GetRegistrationNotification(int vehicleId);
        Task<ServiceResponse<int>> SetRegistrationStatusToFalse(int vehicleId);
    }
}