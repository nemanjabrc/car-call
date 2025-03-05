using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Owner
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Company Company { get; set; }
        public int? CompanyId { get; set; }
        public NotificationType NotificationService { get; set; }
        public User User { get; set; }
        public List<Vehicle> Vehicles { get; set; }
        public List<FirebaseToken> FirebaseTokens { get; set; }
    }
}