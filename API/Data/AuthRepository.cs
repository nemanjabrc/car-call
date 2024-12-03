using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs.Admin;
using API.Helpers.EmailHelper;
using API.Helpers.PasswordHelper;
using API.Migrations;
using API.Services.EmailService;
using API.Services.UserContextService;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.IdentityModel.Tokens;

namespace API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IUserHttpContextService _userHttpContextService;
        private readonly IEmailService _emailService;

        public AuthRepository(DataContext context, IConfiguration configuration, IUserHttpContextService userHttpContextService, IEmailService emailService)
        {
            _userHttpContextService = userHttpContextService;
            _emailService = emailService;
            _configuration = configuration;
            _context = context;

        }
        public async Task<ServiceResponse<string>> Login(string usernameOrMail, string password)
        {
            var response = new ServiceResponse<string>();
            var user = await _context.Users.Include(u => u.Company).FirstOrDefaultAsync(u => u.Username.ToLower() == usernameOrMail.ToLower() ||
                u.Email.ToLower() == usernameOrMail.ToLower());
            if (user is null)
            {
                response.Success = false;
                response.Message = "Korisnik nije pronadjen.";
            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Netačna lozinka. Pokušajte ponovo.";
            }
            else
            {
                response.Data = CreateToken(user);
                response.Success = true;
                response.Message = "Uspješno ste se ulogovali.";
            }

            return response;
        }

        public async Task<ServiceResponse<int>> Register(Owner owner, string username, string password)
        {
            var response = new ServiceResponse<int>();
            if (await UserExists(username))
            {
                response.Success = false;
                response.Message = "Korsničko ime je zauzeto. Izaberite neko drugo.";
                return response;
            }

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            User user = new User
            {
                Name = owner.Name,
                Surname = owner.Surname,
                Email = owner.Email,
                Username = username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = UserTypeClass.OwnerType,
                CreatedBy = null,
                CreationDate = DateTime.Now,
                Company = null
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            owner.User = user;
            _context.Owners.Add(owner);
            await _context.SaveChangesAsync();

            response.Data = user.Id;
            response.Success = true;
            response.Message = "Uspješno ste se registrovali!";

            return response;
        }

        public async Task<ServiceResponse<int>> RegisterAdmin(User user, string password, int companyId)
        {
            var response = new ServiceResponse<int>();
            if (await UserExists(user.Username))
            {
                response.Success = false;
                response.Message = "Korisničko ime za admina je zauzeto. Izaberite neko drugo";
                return response;
            }

            try
            {
                var company = await _context.Companies.FirstAsync(c => c.Id == companyId);
                user.Company = company;
            }
            catch (InvalidOperationException)
            {
                response.Success = false;
                response.Message = "Kompanija sa datim Id ne postoji.";
                return response;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = "Došlo je do neočekivane greške" + e.Message;
                return response;
            }

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Role = UserTypeClass.AdminType;
            user.CreatedBy = UserTypeClass.SuperAdminType;
            user.CreationDate = DateTime.Now;


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            response.Data = user.Id;
            response.Success = true;
            response.Message = "Uspješno se registrovali novi nalog za administratora.";

            return response;
        }

        public async Task<ServiceResponse<int>> RegisterOperator(User user, string password)
        {
            var response = new ServiceResponse<int>();

            if (!_userHttpContextService.GetUserRole().Equals(UserTypeClass.AdminType.ToString()))
            {
                response.Success = false;
                response.Message = "Neovlašten pristup! Samo administratori mogu kreirati naloge za operatore.";
                return response;
            }

            if (await UserExists(user.Username))
            {
                response.Success = false;
                response.Message = "Korisničko ime za operatera je zauzeto. Izaberite neko drugo.";
                return response;
            }

            try
            {
                var company = await _context.Companies.FirstAsync(c => c.Id == _userHttpContextService.GetUserCompanyId());
                user.Company = company;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
                return response;
            }

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Role = UserTypeClass.OperatorType;
            user.CreatedBy = UserTypeClass.AdminType;
            user.CreationDate = DateTime.Now;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            response.Data = user.Id;
            response.Success = true;
            response.Message = "Uspješno ste registrovali novi nalog za operatora.";

            return response;
        }

        public async Task<ServiceResponse<int>> RegisterOwner(Owner owner)
        {
            var response = new ServiceResponse<int>();

            if (_userHttpContextService.GetUserRole().Equals(UserTypeClass.OwnerType.ToString()))
            {
                response.Success = false;
                response.Message = "Neovlašten pristup! Samo operateri i administratori mogu kreirati naloge za druge vlasnike.";
                return response;
            }

            User user = new User();

            try
            {
                var company = await _context.Companies.FirstAsync(c => c.Id == _userHttpContextService.GetUserCompanyId());
                user.Company = company;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
                return response;
            }

            string username = await GenerateOwnerUsername(owner.Name, owner.Surname);
            string password = UserPasswordGenerator.GenerateRandomPassword();
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            string role = _userHttpContextService.GetUserRole();
            switch (role)
            {
                case "OperatorType":
                    user.CreatedBy = UserTypeClass.OperatorType;
                    break;
                case "AdminType":
                    user.CreatedBy = UserTypeClass.AdminType;
                    break;
            }

            user.Name = owner.Name;
            user.Surname = owner.Surname;
            user.Username = username;
            user.Email = owner.Email;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.IsPasswordTemporary = true;
            user.Role = UserTypeClass.OwnerType;
            user.CreationDate = DateTime.Now;

            var placeholders = new Dictionary<string, string>
            {
                {"Name", user.Name},
                {"Surname", user.Surname},
                {"Company", user.Company.Name},
                {"Username", user.Username},
                {"Password", password},
            };

            string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplate", "RegisteredOwnerEmailTemplate.html");
            string emailBody = EmailTemplateHelper.GetEmailBody(templatePath, placeholders);
            await _emailService.SendEmailAsync(user.Email, "Dobro došli u Car Call!", emailBody);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            owner.User = user;
            _context.Owners.Add(owner);
            await _context.SaveChangesAsync();

            response.Data = user.Id;
            response.Success = true;
            response.Message = "Uspješno ste registrovali novog vlasnika.";

            return response;
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower());
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private async Task<string> GenerateOwnerUsername(string name, string surname)
        {
            string baseUsername = $"{name.ToLower()}.{surname.ToLower()}";
            string username = baseUsername;
            int counter = 1;

            while (await UserExists(username))
            {
                username = $"{baseUsername}{counter}";
                counter++;
            }

            return username;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("Role", user.Role.ToString())
            };

            if (user.Company is not null)
            {
                //IZBRISI OVE LINIJE ZA LOGOVANJE 
                Console.WriteLine($"Company is not null. CompanyId: {user.Company.Id}");
                claims.Add(new Claim("CompanyId", user.Company.Id.ToString()));
            }
            else
            {
                Console.WriteLine("NO Company");
            }

            var appSettingToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingToken is null)
                throw new Exception("AppSettings Token is null!");

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingToken));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}