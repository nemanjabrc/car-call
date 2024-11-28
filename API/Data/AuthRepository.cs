using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Migrations;

namespace API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public Task<ServiceResponse<string>> Login(string usernameOrMail, string password)
        {
            throw new NotImplementedException();
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

        public Task<ServiceResponse<int>> RegisterOperator(User user, string password)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<int>> RegisterOwner(Owner owner, string username, string password)
        {
            throw new NotImplementedException();
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
    }
}