using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Services.UserContext
{
    public class UserHttpContextService : IUserHttpContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserHttpContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;

        }

        public int GetUserCompanyId()
        {
            var companyId = _httpContextAccessor.HttpContext!.User.FindFirstValue("CompanyId");
            return companyId != null ? int.Parse(companyId) : throw new Exception("Korisnik ne pripada nijednoj kompaniji");
        }

        public string GetUserId() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier);

        public string GetUsername() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name);

        public string GetUserRole() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Role).ToString();
    }
}