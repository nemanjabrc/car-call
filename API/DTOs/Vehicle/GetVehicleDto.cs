using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Owner;

namespace API.DTOs.Vehicle
{
    public class GetVehicleDto
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
        public int NumberOfNotifications { get; set; }
        public int OwnerId { get; set; }
    }
}