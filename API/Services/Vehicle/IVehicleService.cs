using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Vehicle;
using API.Models;

namespace API.Services.Vehicle
{
    public interface IVehicleService
    {
        Task<ServiceResponse<GetVehicleDto>> GetVehicle(int vehicleId);
        Task<ServiceResponse<List<GetVehicleDto>>> GetVehicles();
        Task<ServiceResponse<GetVehicleDto>> AddVehicle(AddVehicleDto newVehicle);
        Task<ServiceResponse<GetVehicleDto>> AddOwnersVehicle(AddVehicleDto newVehicle, int ownerId);
        Task<ServiceResponse<GetVehicleDto>> RenewRegistration(int vehicleId);
        Task<ServiceResponse<GetVehicleDto>> UpdateVehicle(UpdateVehicleDto updatedVehicle);
        Task<ServiceResponse<int>> DeleteVehicle(int vehicleId);
        Task<ServiceResponse<List<GetVehicleDto>>> GetAllVehiclesFromCompany(int companyId);
        Task<ServiceResponse<List<GetVehicleDto>>> GetOwnersVehicles(int ownerId);
    }
}