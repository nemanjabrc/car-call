using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Notification
{
    public class UpdateRegistrationNotificationDto
    {
        public int CompanyId { get; set; }
        public string Message { get; set; }
    }
}