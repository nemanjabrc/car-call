using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Notification
{
    public class AddMaintenanceNotificationDto
    {
        [Required]
        public string Message { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public int NumberOfDays { get; set; }

        [Required]
        public bool Repetitive { get; set; }
    }
}