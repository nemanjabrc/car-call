using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Category;
using API.DTOs.Company;
using API.DTOs.Notification;
using API.DTOs.Owner;
using API.DTOs.User;
using API.DTOs.Vehicle;
using API.DTOs.VehicleManufacturer;
using API.DTOs.VehicleModel;
using API.Models;
using AutoMapper;

namespace API
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Company, GetCompanyDto>();
            CreateMap<AddCompanyDto, Company>();

            CreateMap<User, GetUserDto>();
            CreateMap<User, GetOperatorProfileDto>();

            CreateMap<Vehicle, GetVehicleDto>();
            CreateMap<AddVehicleDto, Vehicle>();

            CreateMap<MaintenanceNotification, GetMaintenanceNotificationDto>();
            CreateMap<AddMaintenanceNotificationDto, MaintenanceNotification>();
            CreateMap<RegistrationNotification, GetRegistrationNotificationDto>();
            CreateMap<RegistrationNotification, GetCompanyRegistrationNotificationDto>();

            CreateMap<Category, GetCategoryDto>();
            CreateMap<VehicleManufacturer, GetVehicleManufacturerDto>();
            CreateMap<VehicleModel, GetVehicleModelDto>();
        }
    }
}