using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class VehicleModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int VehicleManufacturerId { get; set; }
        public VehicleManufacturer VehicleManufacturer { get; set; }
    }
}