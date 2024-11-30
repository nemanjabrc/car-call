using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.UserContextService
{
    public interface IUserHttpContextService
    {
        int GetUserId();
        string GetUsername();
        int GetUserCompanyId();
        string GetUserRole();
    }
}