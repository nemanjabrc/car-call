using API.DTOs.Notification;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using System;
using System.Threading.Tasks;

namespace API.Firebase
{
    public class FirebaseService : IFirebaseService
    {
        private static FirebaseApp _firebaseApp;

        public FirebaseService()
        {
            if (_firebaseApp == null)
            {
                _firebaseApp = FirebaseApp.Create(new AppOptions()
                {
                    Credential = GoogleCredential.FromFile("firebase-config.json")
                });
            }
        }

        public async Task SendPushNotification(string token, string title, string body)
        {
            var message = new Message()
            {
                Token = token,
                Notification = new Notification
                {
                    Title = title,
                    Body = body
                },
            };

            var messaging = FirebaseMessaging.GetMessaging(_firebaseApp);
            var response = await messaging.SendAsync(message);
            Console.WriteLine("Sent message: " + response);
        }

        public async Task SendVehicleRegistrationPushNotification(string token, RegistrationNotificationDto registrationNotification)
        {
            string title = "Podsjetnik za registraciju ⏰";
            string body = $"""
            Zdravo {registrationNotification.OwnerName} {registrationNotification.OwnerSurname},
            Registracija Vašeg vozila {registrationNotification.Manufacturer} {registrationNotification.Model} {registrationNotification.YearOfManufacture} ({registrationNotification.RegistrationPlate})
            ističe za {registrationNotification.DaysUntilExpiration}. 
            """;

            var message = new Message()
            {
                Token = token,
                Notification = new Notification
                {
                    Title = title,
                    Body = body
                }
            };

            var messaging = FirebaseMessaging.GetMessaging(_firebaseApp);
            var response = await messaging.SendAsync(message);
            Console.WriteLine("Sent message: " + response);
        }

        public async Task SendVehicleMaintenancePushNotification(string token, MaintenanceNotificationDto maintenanceNotification)
        {
            string title = "Podsjetnik za održavanje ⏰";
            string body = $"""
            Podsjetnik za {maintenanceNotification.Manufacturer} {maintenanceNotification.Model} {maintenanceNotification.YearOfManufacture} ({maintenanceNotification.RegistrationPlate})
            Zdravo {maintenanceNotification.OwnerName} {maintenanceNotification.OwnerSurname},
            {maintenanceNotification.NotificationMessage}
            """;

            var message = new Message()
            {
                Token = token,
                Notification = new Notification
                {
                    Title = title,
                    Body = body
                }
            };

            var messaging = FirebaseMessaging.GetMessaging(_firebaseApp);
            var response = await messaging.SendAsync(message);
            Console.WriteLine("Sent message: " + response);
        }
    }
}