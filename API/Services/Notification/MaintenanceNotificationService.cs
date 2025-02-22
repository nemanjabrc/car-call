using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Notification;
using API.Migrations;
using API.Models;
using API.Services.UserContext;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Notification
{
    public class MaintenanceNotificationService : IMaintenanceNotificationService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserHttpContextService _userHttpContextService;
        private readonly BackgroundJobsModifyContext _modifyContext;
        public MaintenanceNotificationService(IUserHttpContextService userHttpContextService, DataContext context, IMapper mapper, BackgroundJobsModifyContext modifyContext)
        {
            _modifyContext = modifyContext;
            _userHttpContextService = userHttpContextService;
            _mapper = mapper;
            _context = context;

        }
        public async Task<ServiceResponse<GetMaintenanceNotificationDto>> AddMaintenanceNotification(int vehicleId, AddMaintenanceNotificationDto newMaintenanceNotification)
        {
            var response = new ServiceResponse<GetMaintenanceNotificationDto>();


            var vehicle = await _context.Vehicles
                .Include(v => v.MaintenanceNotifications)
                .FirstOrDefaultAsync(v => v.Id == vehicleId);
            if (vehicle is null)
            {
                response.Success = false;
                response.Message = $"U bazi nije pronadjeno vozilo sa id: {vehicleId}";
                return response;
            }

            string userId = _userHttpContextService.GetUserId();
            var owner = await _context.Owners
                .Include(v => v.Vehicles)
                .FirstOrDefaultAsync(o => o.User.Id == userId);

            bool belongs = owner.Vehicles.Any(v => v.Id == vehicle.Id);
            if (!belongs)
            {
                response.Success = false;
                response.Message = $"Vozilo sa id: {vehicle.Id} ne pripada prijavljenom vlasniku. Ne možete izvršiti izmjenu.";
                return response;
            }

            MaintenanceNotification maintenanceNotification = _mapper.Map<MaintenanceNotification>(newMaintenanceNotification);
            maintenanceNotification.DateOfNotification = maintenanceNotification.StartDate.AddDays(maintenanceNotification.NumberOfDays).Date;
            maintenanceNotification.Vehicle = vehicle;

            _context.MaintenanceNotifications.Add(maintenanceNotification);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                response.Success = false;
                response.Message = "Greška prilikom dodavanja nove notifikacije za vozilo.";
                return response;
            }

            response.Data = _mapper.Map<GetMaintenanceNotificationDto>(maintenanceNotification);
            response.Success = true;

            return response;
        }

        public async Task<ServiceResponse<int>> DeleteMaintenanceNotification(int notificationId)
        {
            var response = new ServiceResponse<int>();

            try
            {
                var maintenanceNotification = await _modifyContext.MaintenanceNotifications.FirstOrDefaultAsync(n => n.Id == notificationId);
                if (maintenanceNotification is null)
                {
                    throw new Exception($"U bazi nije pronadjena notifikacija sa id: {notificationId}");
                }

                _modifyContext.MaintenanceNotifications.Remove(maintenanceNotification);
                await _modifyContext.SaveChangesAsync();

                response.Success = true;
                response.Data = maintenanceNotification.Id;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetMaintenanceNotificationDto>>> GetAllVehicleMaintenanceNotifications(int vehicleId)
        {
            var response = new ServiceResponse<List<GetMaintenanceNotificationDto>>();

            var notifications = await _context.MaintenanceNotifications.Where(n => n.Vehicle.Id == vehicleId).ToListAsync();

            response.Success = true;
            response.Data = notifications.Select(n => _mapper.Map<GetMaintenanceNotificationDto>(n)).ToList();

            return response;
        }

        public async Task<ServiceResponse<GetMaintenanceNotificationDto>> GetSingleVehicleMaintenanceNotification(int notificationId)
        {
            var response = new ServiceResponse<GetMaintenanceNotificationDto>();
            var notification = await _context.MaintenanceNotifications.FirstOrDefaultAsync(n => n.Id == notificationId);
            if (notification is null)
            {
                response.Success = false;
                response.Message = $"Notifikacija sa id: {notificationId} nije pronadjena.";
                return response;
            }

            response.Success = true;
            response.Data = _mapper.Map<GetMaintenanceNotificationDto>(notification);

            return response;
        }

        public async Task<ServiceResponse<GetMaintenanceNotificationDto>> ResetMaintenanceNotification(int notificationId, int numberOfDays, DateTime startDate)
        {
            var response = new ServiceResponse<GetMaintenanceNotificationDto>();

            try
            {
                var maintenanceNotification = await _modifyContext.MaintenanceNotifications.FirstOrDefaultAsync(n => n.Id == notificationId);
                if (maintenanceNotification is null)
                {
                    throw new Exception($"U bazi nije pronadjena notifikacija sa id: {notificationId}");
                }

                maintenanceNotification.StartDate = startDate;
                maintenanceNotification.DateOfNotification = startDate.AddDays(numberOfDays);

                await _modifyContext.SaveChangesAsync();
                response.Data = _mapper.Map<GetMaintenanceNotificationDto>(maintenanceNotification);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public Task<ServiceResponse<GetMaintenanceNotificationDto>> UpdateMaintenanceNotification(UpdateMaintenanceNotificationDto updatedMaintenanceNotification)
        {
            throw new NotImplementedException();
        }
    }
}