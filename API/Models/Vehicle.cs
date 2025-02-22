using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string YearOfManufacture { get; set; }
        public string RegistrationPlate { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public DateTime DateOfExpiration { get; set; }
        public bool IsRegistered { get; set; }
        public Owner Owner { get; set; }
        public int RegistrationNotificationId { get; set; }
        public RegistrationNotification RegistrationNotification { get; set; }
        public List<MaintenanceNotification> MaintenanceNotifications { get; set; }
    }
}