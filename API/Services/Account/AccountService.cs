using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Owner;
using API.DTOs.User;
using API.DTOs.Vehicle;
using API.ExtensionMethods;
using API.Helpers.Email;
using API.Helpers.Password;
using API.Models;
using API.Services.Email;
using API.Services.Token;
using API.Services.UserContext;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly IUserHttpContextService _userHttpContextService;
        private readonly IEmailService _emailService;
        public AccountService(UserManager<User> userManager, TokenService tokenService, IMapper mapper,
            DataContext context, IUserHttpContextService userHttpContextService, IEmailService emailService)
        {
            _emailService = emailService;
            _userHttpContextService = userHttpContextService;
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
            _context = context;

        }

        public async Task<ServiceResponse<GetAdminProfileDto>> GetCurrentAdminProfile()
        {
            var response = new ServiceResponse<GetAdminProfileDto>();

            string userId = _userHttpContextService.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {userId} nije pronadjen.";
                return response;
            }

            var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == user.CompanyId);

            GetAdminProfileDto adminProfile = new()
            {
                Username = user.UserName,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                CompanyName = company.Name,
                CreationDate = user.CreationDate
            };

            response.Success = true;
            response.Data = adminProfile;

            return response;
        }

        public async Task<ServiceResponse<GetOperatorProfileDto>> GetCurrentOperatorProfile()
        {
            var response = new ServiceResponse<GetOperatorProfileDto>();

            string userId = _userHttpContextService.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {userId} nije pronadjen.";
                return response;
            }

            var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == user.CompanyId);

            GetOperatorProfileDto operatorProfile = new()
            {
                Username = user.UserName,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                CompanyName = company.Name,
                CreationDate = user.CreationDate
            };

            response.Success = true;
            response.Data = operatorProfile;

            return response;
        }

        public async Task<ServiceResponse<GetOwnerProfileDto>> GetCurrentOwnerProfile()
        {
            var response = new ServiceResponse<GetOwnerProfileDto>();

            string userId = _userHttpContextService.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {userId} nije pronadjen.";
                return response;
            }

            var owner = await _context.Owners
                .Include(o => o.Vehicles)
                .Include(o => o.Company)
                .Include(o => o.FirebaseTokens)
                .FirstOrDefaultAsync(o => o.User.Id == userId);

            if (owner is null)
            {
                response.Success = false;
                response.Message = $"Vlasnik sa korisničkim id: {userId} nije pronadjen.";
                return response;
            }

            int numberOfVehicles = owner.Vehicles.Count;
            string[] tokens = new string[owner.FirebaseTokens.Count];
            int i = 0;
            foreach (var firebaseToken in owner.FirebaseTokens)
            {
                tokens[i] = firebaseToken.Token;
                i++;
            }

            GetOwnerProfileDto ownerProfile = new()
            {
                OwnerId = owner.Id,
                Username = user.UserName,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                PhoneNumber = owner.PhoneNumber,
                NotificationService = owner.NotificationService,
                NumberOfVehicles = numberOfVehicles,
                CompanyName = owner.Company != null ? owner.Company.Name : "",
                CreationDate = user.CreationDate,
                FirebaseTokens = tokens
            };

            response.Success = true;
            response.Data = ownerProfile;

            return response;
        }

        public async Task<ServiceResponse<GetSuperadminProfileDto>> GetSuperadminProfile()
        {
            var response = new ServiceResponse<GetSuperadminProfileDto>();

            string userId = _userHttpContextService.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {userId} nije pronadjen.";
                return response;
            }

            GetSuperadminProfileDto superadminProfile = new()
            {
                Username = user.UserName,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                CreationDate = user.CreationDate
            };

            response.Success = true;
            response.Data = superadminProfile;

            return response;
        }

        public async Task<ServiceResponse<GetUserDto>> Login(LoginUserDto loginUser)
        {
            var response = new ServiceResponse<GetUserDto>();
            var user = await _userManager.FindByNameAsync(loginUser.Username);
            if (user is null)
            {
                response.Success = false;
                response.Message = $"Korisnik {loginUser.Username} nije pronadjen.";
                return response;
            }
            else if (!await _userManager.CheckPasswordAsync(user, loginUser.Password))
            {
                response.Success = false;
                response.Message = $"Pogrešna lozinka!";
                return response;
            }

            var loggedUser = new GetUserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                IsPasswordTemporary = user.IsPasswordTemporary
            };

            response.Data = loggedUser;
            response.Success = true;

            return response;
        }

        public async Task<ServiceResponse<IdentityResult>> ChangePassword(User user, string oldPassword, string newPassword)
        {
            var response = new ServiceResponse<IdentityResult>();

            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            if (!result.Succeeded)
            {
                response.Data = result;
                response.Success = false;
                response.Message = "Problem sa promjenom lozinke.";
                return response;
            }

            user.IsPasswordTemporary = false;
            await _userManager.UpdateAsync(user);

            response.Data = result;
            response.Success = true;
            response.Message = "Lozinka je uspješno promijenjena.";

            return response;
        }

        public async Task<ServiceResponse<string>> ForgotPassword(string email)
        {
            var response = new ServiceResponse<string>();

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                response.Success = false;
                response.Message = "Korisnik sa ovom email adresom ne postoji.";
                return response;
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetLink = $"http://localhost:3000/resetpassword/{email}/{Uri.EscapeDataString(token)}";

            var placeholders = new Dictionary<string, string>
            {
                {"Name", user.Name},
                {"Surname", user.Surname},
                {"Username", user.UserName},
                {"Link", resetLink},
            };

            string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplates", "ForgotPasswordEmailTemplate.html");
            string emailBody = EmailTemplateHelper.GetEmailBody(templatePath, placeholders);

            await _emailService.SendUserEmailAsync(user.Email, "Reset lozinke 🔑", emailBody);

            response.Success = true;
            response.Message = "Link za reset lozinke je poslat na email.";
            response.Data = resetLink;

            return response;
        }

        public async Task<ServiceResponse<string>> ResetPassword(string email, string token, string newPassword)
        {
            var response = new ServiceResponse<string>();

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                response.Success = false;
                response.Message = "Korisnik nije pronadjen u bazi.";
                return response;
            }

            var decodedToken = Uri.UnescapeDataString(token);
            var result = await _userManager.ResetPasswordAsync(user, decodedToken, newPassword);

            if (!result.Succeeded)
            {
                response.Success = false;
                response.Message = "Resetovanje lozinke nije uspjelo.";
                response.Data = string.Join("; ", result.Errors.Select(e => e.Description));
                return response;
            }

            response.Success = true;
            response.Message = "Lozinka je uspješno resetovana.";
            return response;
        }

        public async Task<ServiceResponse<IdentityResult>> Register(Owner owner, string username, string password)
        {
            var response = new ServiceResponse<IdentityResult>();
            var user = new User
            {
                Name = owner.Name,
                Surname = owner.Surname,
                UserName = username,
                Email = owner.Email,
                CreatedBy = null,
                Company = null,
                CompanyId = null,
                CreationDate = DateTime.Now,
                IsPasswordTemporary = false
            };

            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                response.Data = result;
                response.Success = false;
                response.Message = "Problem sa validacijom.";
                return response;
            }

            await _userManager.AddToRoleAsync(user, "Owner");

            owner.User = user;
            owner.Company = null;
            _context.Owners.Add(owner);
            await _context.SaveChangesAsync();

            response.Data = result;
            response.Success = true;

            return response;
        }

        public async Task<ServiceResponse<IdentityResult>> RegisterAdmin(User user, int companyId)
        {
            var response = new ServiceResponse<IdentityResult>();
            try
            {
                var company = await _context.Companies.FirstAsync(c => c.Id == companyId);
                user.Company = company;
                user.CompanyId = companyId;
            }
            catch (InvalidOperationException)
            {
                response.Success = false;
                response.Message = $"Kompanija sa id {companyId} ne postoji.";
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }

            string username = await GenerateUsername(user.Name, user.Surname);
            string password = PasswordGeneratorHelper.GeneratePassword();

            user.UserName = username;
            user.CreatedBy = UserType.SuperAdminType;
            user.CreationDate = DateTime.Now;
            user.IsPasswordTemporary = true;

            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                response.Data = result;
                response.Success = false;
                response.Message = "Problem sa validacijom.";
                return response;
            }

            await _userManager.AddToRoleAsync(user, "Admin");

            var placeholders = new Dictionary<string, string>
            {
                {"Name", user.Name},
                {"Surname", user.Surname},
                {"Company", user.Company.Name},
                {"Username", user.UserName},
                {"Password", password},
            };

            string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplates", "RegisteredAdminEmailTemplate.html");
            string emailBody = EmailTemplateHelper.GetEmailBody(templatePath, placeholders);

            await _emailService.SendUserEmailAsync(user.Email, "Dobro došli u Car Call! 🚀", emailBody);

            response.Data = result;
            response.Success = true;

            return response;
        }

        public async Task<ServiceResponse<IdentityResult>> RegisterOperator(User user)
        {
            var response = new ServiceResponse<IdentityResult>();
            try
            {
                var companyId = _userHttpContextService.GetUserCompanyId();
                var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == companyId);
                user.Company = company;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Ne možete kreirati nalog za operatera." + ex.Message;
                return response;
            }

            string username = await GenerateUsername(user.Name, user.Surname);
            string password = PasswordGeneratorHelper.GeneratePassword();

            user.UserName = username;
            user.CreatedBy = UserType.AdminType;
            user.CreationDate = DateTime.Now;
            user.IsPasswordTemporary = true;

            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                response.Data = result;
                response.Success = false;
                response.Message = "Problem sa validacijom.";
                return response;
            }

            await _userManager.AddToRoleAsync(user, "Operator");

            var placeholders = new Dictionary<string, string>
            {
                {"Name", user.Name},
                {"Surname", user.Surname},
                {"Company", user.Company.Name},
                {"Username", user.UserName},
                {"Password", password},
            };

            string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplates", "RegisteredOperatorEmailTemplate.html");
            string emailBody = EmailTemplateHelper.GetEmailBody(templatePath, placeholders);

            await _emailService.SendUserEmailAsync(user.Email, "Dobro došli u Car Call! 🚀", emailBody);

            response.Data = result;
            response.Success = true;
            return response;
        }

        public async Task<ServiceResponse<IdentityResult>> RegisterOwner(Owner owner)
        {
            var response = new ServiceResponse<IdentityResult>();

            string currentUserRole = _userHttpContextService.GetUserRole();
            int companyId = _userHttpContextService.GetUserCompanyId();

            User user = new User();

            try
            {
                var company = await _context.Companies.FirstAsync(c => c.Id == companyId);
                user.Company = company;
                user.CompanyId = companyId;
                owner.Company = company;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Ne možete kreirati nalog za vlasnika." + ex.Message;
                return response;
            }

            string username = await GenerateUsername(owner.Name, owner.Surname);
            string password = PasswordGeneratorHelper.GeneratePassword();

            switch (currentUserRole)
            {
                case "Admin":
                    user.CreatedBy = UserType.AdminType;
                    break;

                case "Operator":
                    user.CreatedBy = UserType.OperatorType;
                    break;
            }

            user.Name = owner.Name;
            user.Surname = owner.Surname;
            user.Email = owner.Email;
            user.UserName = username;
            user.IsPasswordTemporary = true;
            user.CreationDate = DateTime.Now;

            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                response.Data = result;
                response.Success = false;
                response.Message = "Problem sa validacijom.";
                return response;
            }

            await _userManager.AddToRoleAsync(user, "Owner");

            owner.User = user;
            _context.Owners.Add(owner);
            await _context.SaveChangesAsync();

            var placeholders = new Dictionary<string, string>
            {
                {"Name", user.Name},
                {"Surname", user.Surname},
                {"Company", user.Company.Name},
                {"Username", user.UserName},
                {"Password", password},
            };

            string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplates", "RegisteredOwnerEmailTemplate.html");
            string emailBody = EmailTemplateHelper.GetEmailBody(templatePath, placeholders);

            await _emailService.SendUserEmailAsync(owner.Email, "Dobro došli u Car Call! 🚀", emailBody);

            response.Data = result;
            response.Success = true;
            return response;
        }


        public async Task<ServiceResponse<List<GetOwnerDto>>> GetAllOwnersFromCompany(int companyId, string searchTerm)
        {
            var response = new ServiceResponse<List<GetOwnerDto>>();

            try
            {
                var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == companyId);
                if (company is null)
                {
                    throw new Exception($"Kompanija sa id: {companyId} nije pronadjena.");
                }

                var query = _context.Owners
                    .SearchOwner(searchTerm)
                    .Where(o => o.CompanyId == companyId)
                    .Select(o => new GetOwnerDto
                    {
                        Id = o.Id,
                        Name = o.Name,
                        Surname = o.Surname,
                        Username = o.User.UserName,
                        Email = o.Email,
                        CompanyName = o.Company.Name,
                        PhoneNumber = o.PhoneNumber,
                        NotificationService = o.NotificationService,
                        CreationDate = o.User.CreationDate,
                        NumberOfVehicles = o.Vehicles.Count
                    }).AsQueryable();

                var owners = await query.ToListAsync();

                response.Success = true;
                response.Data = owners;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<GetOwnerDto>> GetOwnerFromCompany(int ownerId)
        {
            var response = new ServiceResponse<GetOwnerDto>();

            var getOwner = await _context.Owners
                .Where(o => o.Id == ownerId)
                .Select(o => new GetOwnerDto
                {
                    Id = o.Id,
                    Name = o.Name,
                    Surname = o.Surname,
                    Username = o.User.UserName,
                    Email = o.Email,
                    CompanyName = o.Company.Name,
                    PhoneNumber = o.PhoneNumber,
                    NotificationService = o.NotificationService,
                    CreationDate = o.User.CreationDate,
                    NumberOfVehicles = o.Vehicles.Count
                })
                .FirstOrDefaultAsync();

            if (getOwner is null)
            {
                response.Success = false;
                response.Message = $"Nije pronađen vlasnik sa Id: {ownerId} u bazi.";
                return response;
            }

            response.Success = true;
            response.Data = getOwner;

            return response;
        }

        public async Task<ServiceResponse<List<GetOperatorProfileDto>>> GetAllOperatorsFromCompany(int companyId, string searchTerm)
        {
            var response = new ServiceResponse<List<GetOperatorProfileDto>>();

            try
            {
                var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == companyId);
                if (company is null)
                {
                    throw new Exception($"Kompanija sa id: {companyId} nije pronađena.");
                }

                var query = _context.Users
                    .SearchOperator(searchTerm)
                    .Where(user => user.CompanyId == companyId &&
                                _context.UserRoles
                                    .Where(ur => ur.UserId == user.Id)
                                    .Join(_context.Roles,
                                            ur => ur.RoleId,
                                            r => r.Id,
                                            (ur, r) => r)
                                    .Any(role => role.NormalizedName == "OPERATOR"))
                    .Select(user => _mapper.Map<GetOperatorProfileDto>(user))
                    .AsQueryable();

                var operators = await query.ToListAsync();

                response.Data = operators;
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<GetOperatorProfileDto>> GetOperatorProfile(string operatorId)
        {
            var response = new ServiceResponse<GetOperatorProfileDto>();

            var user = await _userManager.FindByIdAsync(operatorId);
            if (user == null)
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {operatorId} nije pronadjen.";
                return response;
            }

            var roles = await _userManager.GetRolesAsync(user);

            if (!roles.Contains("Operator"))
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {operatorId} nema rolu operatora.";
                return response;
            }

            var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == user.CompanyId);

            GetOperatorProfileDto operatorProfile = new()
            {
                Id = user.Id,
                Username = user.UserName,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                CompanyName = company.Name,
                CreationDate = user.CreationDate
            };

            response.Success = true;
            response.Data = operatorProfile;

            return response;
        }

        public async Task<ServiceResponse<IdentityResult>> DeleteOperator(string operatorId)
        {
            var response = new ServiceResponse<IdentityResult>();

            var user = await _userManager.FindByIdAsync(operatorId);
            if (user == null)
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {operatorId} nije pronadjen u bazi.";
                return response;
            }

            var roles = await _userManager.GetRolesAsync(user);

            if (!roles.Contains("Operator"))
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {operatorId} nema rolu operatora.";
                return response;
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                response.Success = false;
                response.Data = result;
                response.Message = "Greška prilikom brisanja.";
                return response;
            }

            response.Success = true;
            response.Data = result;

            return response;
        }

        public async Task<ServiceResponse<IdentityResult>> DeleteOwner(int ownerId)
        {
            var response = new ServiceResponse<IdentityResult>();

            var owner = await _context.Owners
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Id == ownerId);
            if (owner == null)
            {
                response.Success = false;
                response.Message = $"Vlasnik sa id: {ownerId} nije pronadjen u bazi.";
                return response;
            }

            var user = await _userManager.FindByIdAsync(owner.User.Id);
            if (user == null)
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {owner.User.Id} nije pronadjen u bazi.";
                return response;
            }

            var roles = await _userManager.GetRolesAsync(user);

            if (!roles.Contains("Owner"))
            {
                response.Success = false;
                response.Message = $"Korisnik sa id: {owner.User.Id} nema rolu operatora.";
                return response;
            }

            _context.Owners.Remove(owner);
            var result2 = await _context.SaveChangesAsync() > 0;
            if (!result2)
            {
                response.Success = false;
                response.Message = "Greška prilikom brisanja vlasnika.";
                return response;
            }

            var result1 = await _userManager.DeleteAsync(user);
            if (!result1.Succeeded)
            {
                response.Success = false;
                response.Data = result1;
                response.Message = "Greška prilikom brisanja korisničkog naloga.";
                return response;
            }

            response.Success = true;
            response.Data = result1;

            return response;
        }

        static string NormalizeString(string input)
        {
            return input
                .Replace('š', 's')
                .Replace('ć', 'c')
                .Replace('č', 'c')
                .Replace('ž', 'z')
                .Replace('đ', 'd')
                .Replace('Š', 'S')
                .Replace('Ć', 'C')
                .Replace('Č', 'C')
                .Replace('Ž', 'Z')
                .Replace('Đ', 'd');
        }

        private async Task<string> GenerateUsername(string name, string surname)
        {

            string baseUsername = $"{NormalizeString(name.ToLower())}{NormalizeString(surname.ToLower())}";
            string username = baseUsername;
            int counter = 1;

            while (await IsUserNameTaken(username))
            {
                username = $"{baseUsername}{counter}";
                counter++;
            }

            return username;
        }


        private async Task<bool> IsUserNameTaken(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            return user != null;
        }
    }
}