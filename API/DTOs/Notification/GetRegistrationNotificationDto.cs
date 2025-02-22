using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Notification
{
    public class GetRegistrationNotificationDto
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime DateOfExpiration { get; set; }
    }
}