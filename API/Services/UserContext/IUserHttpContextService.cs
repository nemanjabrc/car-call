using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.UserContext
{
    public interface IUserHttpContextService
    {
        int GetUserCompanyId();
        string GetUserRole();
        string GetUsername();
        string GetUserId();
    }
}