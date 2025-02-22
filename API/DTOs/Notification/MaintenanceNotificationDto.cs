using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Notification
{
    public class MaintenanceNotificationDto
    {
        public int Id { get; set; }
        //Podaci o vozilu
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string YearOfManufacture { get; set; }
        public string RegistrationPlate { get; set; }

        //Podaci o vlasniku
        public string OwnerName { get; set; }
        public string OwnerSurname { get; set; }
        public string OwnerPhoneNumber { get; set; }
        public string OwnerEmail { get; set; }
        public int NotificationService { get; set; }

        //Podaci poruci
        public string NotificationMessage { get; set; }
        public int NumberOfDays { get; set; }
        public bool Repetitive { get; set; }
    }
}