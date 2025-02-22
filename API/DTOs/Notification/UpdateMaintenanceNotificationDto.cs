using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Notification
{
    public class UpdateMaintenanceNotificationDto
    {
        public string Message { get; set; }
        public DateTime StartDate { get; set; }
        public int NumberOfDays { get; set; }
        public DateTime DateOfNotification { get; set; }
        public bool Repetitive { get; set; }
    }
}