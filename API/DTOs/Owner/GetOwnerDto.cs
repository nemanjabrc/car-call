using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Vehicle;
using API.Models;

namespace API.DTOs.Owner
{
    public class GetOwnerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public string PhoneNumber { get; set; }
        public NotificationType NotificationService { get; set; }
        public DateTime CreationDate { get; set; }
        public int NumberOfVehicles { get; set; }
    }
}