using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public interface IAuthRepository
    {
        Task<ServiceResponse<int>> Register(Owner owner, string username, string password);
        Task<ServiceResponse<int>> RegisterOwner(Owner owner, string username, string password);
        Task<ServiceResponse<int>> RegisterOperator(User user, string password);
        Task<ServiceResponse<int>> RegisterAdmin(User user, string password);
        Task<ServiceResponse<string>> Login(string usernameOrMail, string password);
        Task<bool> UserExists(string username);
    }
}