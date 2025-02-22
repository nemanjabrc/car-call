using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs.Notification
{
    public class GetMaintenanceNotificationDto
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime StartDate { get; set; }
        public int NumberOfDays { get; set; }
        public DateTime DateOfNotification { get; set; }
        public bool Repetitive { get; set; }
    }
}