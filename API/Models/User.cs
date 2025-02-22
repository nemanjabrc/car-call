using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public UserType? CreatedBy { get; set; }
        public Company Company { get; set; }
        public int? CompanyId { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsPasswordTemporary { get; set; }
    }
}