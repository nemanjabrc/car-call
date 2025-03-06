using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Owner;
using API.DTOs.User;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Services.Account
{
    public interface IAccountService
    {
        Task<ServiceResponse<GetUserDto>> Login(LoginUserDto loginUser);
        Task<ServiceResponse<IdentityResult>> ChangePassword(User user, string oldPassword, string newPassword);
        Task<ServiceResponse<IdentityResult>> Register(Owner owner, string username, string password);
        Task<ServiceResponse<IdentityResult>> RegisterOwner(Owner owner);
        Task<ServiceResponse<IdentityResult>> RegisterOperator(User user);
        Task<ServiceResponse<IdentityResult>> RegisterAdmin(User user, int companyId);
        Task<ServiceResponse<GetOwnerProfileDto>> GetCurrentOwnerProfile();
        Task<ServiceResponse<GetOperatorProfileDto>> GetCurrentOperatorProfile();
        Task<ServiceResponse<GetAdminProfileDto>> GetCurrentAdminProfile();
        Task<ServiceResponse<GetSuperadminProfileDto>> GetSuperadminProfile();
        Task<ServiceResponse<List<GetOwnerDto>>> GetAllOwnersFromCompany(int companyId, string searchTerm);
        Task<ServiceResponse<GetOwnerDto>> GetOwnerFromCompany(int ownerId);
        Task<ServiceResponse<List<GetOperatorProfileDto>>> GetAllOperatorsFromCompany(int companyId, string searchTerm);
        Task<ServiceResponse<GetOperatorProfileDto>> GetOperatorProfile(string operatorId);
        Task<ServiceResponse<IdentityResult>> DeleteOperator(string operatorId);
    }
}