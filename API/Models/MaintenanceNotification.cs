using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MaintenanceNotification
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime StartDate { get; set; }
        public int NumberOfDays { get; set; }
        public DateTime DateOfNotification { get; set; }
        public bool Repetitive { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}