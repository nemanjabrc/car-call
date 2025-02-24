using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Vehicle;
using API.Models;
using API.Services.UserContext;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Vehicle
{
    public class VehicleService : IVehicleService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IUserHttpContextService _userHttpContextService;
        public VehicleService(IMapper mapper, DataContext context, UserManager<User> userManager, IUserHttpContextService userHttpContextService)
        {
            _userHttpContextService = userHttpContextService;
            _userManager = userManager;
            _context = context;
            _mapper = mapper;

        }

        public async Task<ServiceResponse<GetVehicleDto>> AddOwnersVehicle(AddVehicleDto newVehicle, int ownerId)
        {
            var response = new ServiceResponse<GetVehicleDto>();
            var companyId = _userHttpContextService.GetUserCompanyId();

            var owner = await _context.Owners.FirstOrDefaultAsync(o => o.Id == ownerId);
            if (owner is null)
            {
                response.Success = false;
                response.Message = $"Nije pronadjen vlasnik sa id: {ownerId} u bazi.";
                return response;
            }

            var vehicle = _mapper.Map<Models.Vehicle>(newVehicle);
            vehicle.Owner = owner;
            vehicle.DateOfRegistration = newVehicle.DateOfRegistration.Date;
            vehicle.DateOfExpiration = newVehicle.DateOfRegistration.Date.AddYears(1);
            vehicle.IsRegistered = (vehicle.DateOfExpiration - DateTime.Now).Days > 30;

            var notification = await _context.RegistrationNotifications.FirstOrDefaultAsync(n => n.Company.Id == companyId);
            if (notification is null)
            {
                response.Success = false;
                response.Message = "Nije pronadjen podsjetnik za registraciju predvidjen ovo vozilo.";
                return response;
            }
            vehicle.RegistrationNotification = notification;

            MaintenanceNotification maintenanceNotification = new()
            {
                Message = $""" 
                Podsjećamo Vas da je vrijeme za godišnji servis vašeg vozila.
                Redovno održavanje je ključno za sigurnost i dugotrajnost vozila.
                """,

                StartDate = newVehicle.DateOfLastMaintenance.Date,
                NumberOfDays = DateTime.IsLeapYear(DateTime.Now.Year) ? 366 : 365,
                DateOfNotification = newVehicle.DateOfLastMaintenance.Date.AddYears(1).AddMonths(-1),
                Repetitive = true,
                Vehicle = vehicle
            };

            _context.MaintenanceNotifications.Add(maintenanceNotification);
            _context.Vehicles.Add(vehicle);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                response.Success = false;
                response.Message = "Greška prilikom dodavanja novog vozila.";
                return response;
            }

            response.Data = _mapper.Map<GetVehicleDto>(vehicle);
            response.Success = true;
            return response;
        }

        public async Task<ServiceResponse<GetVehicleDto>> AddVehicle(AddVehicleDto newVehicle)
        {
            var response = new ServiceResponse<GetVehicleDto>();
            var vehicle = _mapper.Map<Models.Vehicle>(newVehicle);
            var currentUserName = _userHttpContextService.GetUsername();
            var currentUser = await _userManager.FindByNameAsync(currentUserName);

            var owner = await _context.Owners.FirstOrDefaultAsync(o => o.User.Id == currentUser.Id);

            vehicle.Owner = owner;
            vehicle.DateOfRegistration = newVehicle.DateOfRegistration.Date;
            vehicle.DateOfExpiration = newVehicle.DateOfRegistration.Date.AddYears(1);
            vehicle.IsRegistered = (vehicle.DateOfExpiration - DateTime.Now).Days > 30;

            var notification = await _context.RegistrationNotifications.FirstOrDefaultAsync(n => n.Id == 2);
            if (notification is null)
            {
                response.Success = false;
                response.Message = "Nije pronadjen podsjetnik za registraciju predvidjen ovo vozilo.";
                return response;
            }
            vehicle.RegistrationNotification = notification;

            MaintenanceNotification maintenanceNotification = new()
            {
                Message = $""" 
                Podsjećamo Vas da je vrijeme za godišnji servis vašeg vozila.
                Redovno održavanje je ključno za sigurnost i dugotrajnost vozila.
                """,

                StartDate = newVehicle.DateOfLastMaintenance.Date,
                NumberOfDays = DateTime.IsLeapYear(DateTime.Now.Year) ? 366 : 365,
                DateOfNotification = newVehicle.DateOfLastMaintenance.Date.AddYears(1).AddMonths(-1),
                Repetitive = true,
                Vehicle = vehicle
            };

            _context.MaintenanceNotifications.Add(maintenanceNotification);
            _context.Vehicles.Add(vehicle);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                response.Success = false;
                response.Message = "Greška prilikom dodavanja novog vozila.";
                return response;
            }

            response.Data = _mapper.Map<GetVehicleDto>(vehicle);
            response.Success = true;
            return response;
        }

        public async Task<ServiceResponse<int>> DeleteVehicle(int vehicleId)
        {
            var response = new ServiceResponse<int>();

            try
            {
                var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.Id == vehicleId);
                if (vehicle is null)
                {
                    response.Success = false;
                    response.Message = $"Nije pronađeno vozilo sa Id: {vehicleId} u bazi.";
                    return response;
                }

                _context.Vehicles.Remove(vehicle);
                int affectedRows = await _context.SaveChangesAsync();

                if (affectedRows > 0)
                {
                    response.Success = true;
                    response.Data = vehicleId;
                }
                else
                {
                    response.Success = false;
                    response.Message = "Brisanje nije uspjelo, nema izmijenjenih zapisa.";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Greška prilikom brisanja: {ex.Message}";
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetVehicleDto>>> GetAllVehiclesFromCompany(int companyId)
        {
            var response = new ServiceResponse<List<GetVehicleDto>>
            {
                Data = new List<GetVehicleDto>()
            };

            try
            {
                var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == companyId);
                if (company is null)
                {
                    throw new Exception($"Kompanija sa id: {companyId} nije pronadjena.");
                }

                await foreach (var vehicle in _context.Vehicles
                    .Include(v => v.MaintenanceNotifications)
                    .Include(v => v.Owner)
                    .Where(v => v.Owner != null && v.Owner.CompanyId == company.Id).AsAsyncEnumerable())
                {
                    int numberOfNotifications = vehicle.MaintenanceNotifications.Count + 1;
                    var vehicleDto = _mapper.Map<GetVehicleDto>(vehicle);
                    vehicleDto.NumberOfNotifications = numberOfNotifications;
                    response.Data.Add(vehicleDto);
                }

                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetVehicleDto>>> GetOwnersVehicles(int ownerId)
        {
            var response = new ServiceResponse<List<GetVehicleDto>>
            {
                Data = new List<GetVehicleDto>()
            };

            var owner = await _context.Owners.FirstOrDefaultAsync(o => o.Id == ownerId);
            if (owner is null)
            {
                response.Success = false;
                response.Message = $"Nije pronadjen vlasnik sa id: {ownerId} u bazi.";
                return response;
            }

            await foreach (var vehicle in _context.Vehicles
                .Include(v => v.MaintenanceNotifications)
                .Where(v => v.Owner.Id == owner.Id).AsAsyncEnumerable())
            {
                int numberOfNotifications = vehicle.MaintenanceNotifications.Count + 1;
                var vehicleDto = _mapper.Map<GetVehicleDto>(vehicle);
                vehicleDto.NumberOfNotifications = numberOfNotifications;
                response.Data.Add(vehicleDto);
            }

            response.Success = true;
            return response;
        }

        public async Task<ServiceResponse<GetVehicleDto>> GetVehicle(int vehicleId)
        {
            var response = new ServiceResponse<GetVehicleDto>();

            var vehicle = await _context.Vehicles
                .Include(v => v.MaintenanceNotifications)
                .FirstOrDefaultAsync(v => v.Id == vehicleId);
            if (vehicle is null)
            {
                response.Success = false;
                response.Message = $"Vozilo sa id: {vehicleId} nije pronadjeno.";
                return response;
            }

            response.Success = true;
            var vehicleDto = _mapper.Map<GetVehicleDto>(vehicle);
            vehicleDto.NumberOfNotifications = vehicle.MaintenanceNotifications.Count + 1;
            response.Data = vehicleDto;

            return response;
        }

        public async Task<ServiceResponse<List<GetVehicleDto>>> GetVehicles()
        {
            var response = new ServiceResponse<List<GetVehicleDto>>
            {
                Data = new List<GetVehicleDto>()
            };

            var currentUserName = _userHttpContextService.GetUsername();
            var currentUser = await _userManager.FindByNameAsync(currentUserName);

            var owner = await _context.Owners.FirstOrDefaultAsync(o => o.User.Id == currentUser.Id);

            await foreach (var vehicle in _context.Vehicles
                .Include(v => v.MaintenanceNotifications)
                .Where(v => v.Owner.Id == owner.Id).AsAsyncEnumerable())
            {
                int numberOfNotifications = vehicle.MaintenanceNotifications.Count + 1;
                var vehicleDto = _mapper.Map<GetVehicleDto>(vehicle);
                vehicleDto.NumberOfNotifications = numberOfNotifications;
                response.Data.Add(vehicleDto);
            }

            response.Success = true;
            return response;
        }

        public async Task<ServiceResponse<GetVehicleDto>> RenewRegistration(int vehicleId)
        {
            var response = new ServiceResponse<GetVehicleDto>();

            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.Id == vehicleId);
            if (vehicle is null)
            {
                response.Success = false;
                response.Message = $"Nije pronadjeno vozilo u bazi sa id: {vehicleId}.";
                return response;
            }

            DateTime today = DateTime.Now.Date;
            if (vehicle.DateOfExpiration < today)
            {
                vehicle.DateOfRegistration = today;
                vehicle.DateOfExpiration = today.AddYears(1);
                vehicle.IsRegistered = true;
            }
            else
            {
                DateTime dateOfregistration = vehicle.DateOfExpiration;
                vehicle.DateOfRegistration = dateOfregistration;
                vehicle.DateOfExpiration = dateOfregistration.AddYears(1);
                vehicle.IsRegistered = true;
            }

            await _context.SaveChangesAsync();

            response.Success = true;
            response.Data = _mapper.Map<GetVehicleDto>(vehicle);

            return response;
        }

        public Task<ServiceResponse<GetVehicleDto>> UpdateVehicle(UpdateVehicleDto updatedVehicle)
        {
            throw new NotImplementedException();
        }
    }
}