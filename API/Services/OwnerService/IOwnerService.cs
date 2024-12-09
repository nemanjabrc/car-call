using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.OwnerService
{
    public interface IOwnerService
    {
        Task<ServiceResponse<List<GetOwnerDto>>> GetOwnersFromCompany();
        Task<ServiceResponse<GetOwnerDto>> GetOwner(int id);
        Task<ServiceResponse<GetOwnerDto>> UpdateOwner(UpdateOwnerDto updatedOwner);
        Task<ServiceResponse<List<GetOwnerDto>>> DeleteOwner(int id);
    }
}