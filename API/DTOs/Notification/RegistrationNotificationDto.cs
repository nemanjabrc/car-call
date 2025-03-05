using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Notification
{
    public class RegistrationNotificationDto
    {
        //Podaci o vozilu
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string YearOfManufacture { get; set; }
        public string RegistrationPlate { get; set; }
        public DateTime DateOfExpiration { get; set; }

        //Podaci o vlasniku
        public int OwnerId { get; set; }
        public string OwnerName { get; set; }
        public string OwnerSurname { get; set; }
        public string OwnerPhoneNumber { get; set; }
        public string OwnerEmail { get; set; }
        public int NotificationService { get; set; }

        //Podaci o sadrzaju poruke
        public string NotificationMessage { get; set; }
        public string DaysUntilExpiration { get; set; }
    }
}