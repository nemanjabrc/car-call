using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Vehicle
{
    public class GetVehicleDto
    {
        public string Type { get; set; } = string.Empty;
        public string Manufacturer { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string YearOfManufacture { get; set; } = string.Empty;
        public string RegistrationPlate { get; set; } = string.Empty;
        public DateTime DateOfRegistration { get; set; }
        public DateTime DateOfExpiration { get; set; }
        public bool IsRegistered { get; set; }
        public int OwnerId { get; set; }
        public RegistrationNotification? RegistrationNotification { get; set; }
        public List<MaintenanceNotification>? MaintenanceNotifications { get; set; }
    }
}