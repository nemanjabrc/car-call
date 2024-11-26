using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = new byte[0];
        public byte[] PasswordSalt { get; set; } = new byte[0];
        public UserTypeClass Role { get; set; } = UserTypeClass.OwnerType;
        public UserTypeClass CreatedBy { get; set; }
        public DateOnly CreationDate { get; set; }
        public Company? Company { get; set; }
    }
}