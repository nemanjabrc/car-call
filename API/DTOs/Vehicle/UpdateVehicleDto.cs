using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Vehicle
{
    public class UpdateVehicleDto
    {
        public string Type { get; set; } = string.Empty;
        public string Manufacturer { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string YearOfManufacture { get; set; } = string.Empty;
        public string RegistrationPlate { get; set; } = string.Empty;
        public DateTime DateOfRegistration { get; set; }
        public bool RegistrationNotificationApproval { get; set; } = true;
        public bool IsRegistered { get; set; }
    }
}