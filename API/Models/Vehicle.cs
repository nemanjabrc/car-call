using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Manufacturer { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string YearOfManufacture { get; set; } = string.Empty;
        public string RegistrationPlate { get; set; } = string.Empty;
        public DateTime DateOfRegistration { get; set; }
        public bool RegistrationNotificationApproval { get; set; } = true;
        public DateTime DateOfExpiration { get; set; }
        public bool IsRegistered { get; set; }
        public Owner? Owner { get; set; }
        public RegistrationNotification? RegistrationNotification { get; set; }
        public List<MaintenanceNotification>? MaintenanceNotifications { get; set; }
    }
}