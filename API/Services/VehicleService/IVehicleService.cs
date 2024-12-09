using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Vehicle;

namespace API.Services.VehicleService
{
    public interface IVehicleService
    {
        Task<ServiceResponse<List<GetVehicleDto>>> GetOwnersVehicles(int ownerId);
        Task<ServiceResponse<GetVehicleDto>> GetVehicle(int vehicleId);
        Task<ServiceResponse<List<GetVehicleDto>>> AddVehicle(AddVehicleDto newVehicle);
        Task<ServiceResponse<List<GetVehicleDto>>> AddVehicleToOWner(AddVehicleDto newVehicle);
        Task<ServiceResponse<GetVehicleDto>> UpdateVehicle(UpdateVehicleDto updatedVehicle);
        Task<ServiceResponse<List<GetVehicleDto>>> DeleteVehicle(int id);
    }
}