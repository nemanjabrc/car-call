using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Notification;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Notification
{
    public class RegistrationNotificationService : IRegistrationNotificationService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly BackgroundJobsModifyContext _modifyContext;

        public RegistrationNotificationService(DataContext context, BackgroundJobsModifyContext modifyContext, IMapper mapper)
        {
            _modifyContext = modifyContext;
            _mapper = mapper;
            _context = context;

        }

        public async Task<ServiceResponse<GetCompanyRegistrationNotificationDto>> ChangeRegistrationNotificationMessage(UpdateRegistrationNotificationDto updatedRegistrationNotification)
        {
            var response = new ServiceResponse<GetCompanyRegistrationNotificationDto>();

            var registrationNotification = await _context.RegistrationNotifications
                .Include(n => n.Company)
                .FirstOrDefaultAsync(n => n.Company.Id == updatedRegistrationNotification.CompanyId);

            if (registrationNotification is null)
            {
                response.Success = false;
                response.Message = $"Nije pronadjena notifikacija za registraciju koja pripada kompaniji sa id: {updatedRegistrationNotification.CompanyId} u bazi";
                return response;
            }

            registrationNotification.Message = updatedRegistrationNotification.Message;

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                response.Data = _mapper.Map<GetCompanyRegistrationNotificationDto>(registrationNotification);
                response.Success = true;
            }

            return response;
        }

        public async Task<ServiceResponse<GetCompanyRegistrationNotificationDto>> GetCompanyRegistrationNotification(int companyId)
        {
            var response = new ServiceResponse<GetCompanyRegistrationNotificationDto>();

            var registrationNotification = await _context.RegistrationNotifications
                .Include(n => n.Company)
                .FirstOrDefaultAsync(n => n.Company.Id == companyId);

            if (registrationNotification is null)
            {
                response.Success = false;
                response.Message = $"Nije pronadjena notifikacija za registraciju koja pripada kompaniji sa id: {companyId} u bazi";
                return response;
            }

            response.Data = _mapper.Map<GetCompanyRegistrationNotificationDto>(registrationNotification);
            response.Success = true;

            return response;
        }

        public async Task<ServiceResponse<GetRegistrationNotificationDto>> GetRegistrationNotification(int vehicleId)
        {
            var response = new ServiceResponse<GetRegistrationNotificationDto>();

            var vehicle = await _context.Vehicles
                .Include(v => v.RegistrationNotification)
                .FirstOrDefaultAsync(v => v.Id == vehicleId);

            if (vehicle is null)
            {
                response.Success = false;
                response.Message = $"Vozilo sa id: {vehicleId} nije pronadjeno.";
                return response;
            }

            var notification = _mapper.Map<GetRegistrationNotificationDto>(vehicle.RegistrationNotification);
            notification.DateOfExpiration = vehicle.DateOfExpiration;

            response.Success = true;
            response.Data = notification;

            return response;
        }

        public async Task<ServiceResponse<int>> SetRegistrationStatusToFalse(int vehicleId)
        {
            var response = new ServiceResponse<int>();

            try
            {
                var vehicle = await _modifyContext.Vehicles.FirstOrDefaultAsync(v => v.Id == vehicleId);
                if (vehicle is null)
                {
                    throw new Exception($"U bazi nije pronadjeno vozilo sa id: {vehicleId}.");
                }

                vehicle.IsRegistered = false;

                await _modifyContext.SaveChangesAsync();

                response.Success = true;
                response.Data = vehicle.Id;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}