using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Vehicle
{
    public class UpdateVehicleDto
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string YearOfManufacture { get; set; }
        public string RegistrationPlate { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public bool IsRegistered { get; set; }
    }
}