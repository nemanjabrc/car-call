using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Services.FirebaseToken
{
    public interface IFirebaseTokenService
    {
        Task<ServiceResponse<string>> AddFirebaseTokenToOwner(int ownerId, string token);
    }
}