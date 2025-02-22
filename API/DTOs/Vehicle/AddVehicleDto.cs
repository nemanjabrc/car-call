using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs.Vehicle
{
    public class AddVehicleDto
    {
        [Required]
        public string Category { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public string YearOfManufacture { get; set; }

        [Required]
        public string RegistrationPlate { get; set; }

        [Required]
        public DateTime DateOfRegistration { get; set; }

        [Required]
        public DateTime DateOfLastMaintenance { get; set; }
    }
}