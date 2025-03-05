using System;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.DTOs.Vehicle;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace API.Services.Twilio
{
    public class TwilioService : ITwilioService
    {
        private readonly string _accountSid;
        private readonly string _authToken;
        private readonly string _sandboxNumber;

        public TwilioService(IConfiguration configuration)
        {
            _accountSid = configuration["Twilio:AccountSid"];
            _authToken = configuration["Twilio:AuthToken"];
            _sandboxNumber = configuration["Twilio:SandboxNumber"];
        }

        public async Task SendWhatsAppMaintenanceNotification(MaintenanceNotificationDto maintenanceNotification)
        {
            TwilioClient.Init(_accountSid, _authToken);

            var fromNumber = new PhoneNumber(_sandboxNumber);
            var toNumber = new PhoneNumber($"whatsapp:{maintenanceNotification.OwnerPhoneNumber}");

            string messageBody = $"""
            *Podsjetnik za {maintenanceNotification.Manufacturer} {maintenanceNotification.Model} ({maintenanceNotification.YearOfManufacture}) ({maintenanceNotification.RegistrationPlate}) ⏰*

            *Zdravo {maintenanceNotification.OwnerName} {maintenanceNotification.OwnerSurname},*
            {maintenanceNotification.NotificationMessage}
                            
            Vaš carcall
            """;

            try
            {
                var message = await MessageResource.CreateAsync(
                    body: messageBody,
                    from: fromNumber,
                    to: toNumber
                );

                Console.WriteLine($"Poruka poslata sa SID: {message.Sid}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Greška prilikom slanja poruke: {ex.Message}\n{ex.StackTrace}");
            }
        }

        public async Task SendWhatsAppMessage(string toPhoneNumber, string messageBody)
        {
            TwilioClient.Init(_accountSid, _authToken);

            var fromNumber = new PhoneNumber(_sandboxNumber);
            var toNumber = new PhoneNumber($"whatsapp:{toPhoneNumber}");

            try
            {
                var message = await MessageResource.CreateAsync(
                    body: messageBody,
                    from: fromNumber,
                    to: toNumber
                );

                Console.WriteLine($"Poruka poslata sa SID: {message.Sid}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Greška prilikom slanja poruke: {ex.Message}\n{ex.StackTrace}");
            }
        }

        public async Task SendWhatsAppRegistrationNotification(RegistrationNotificationDto registrationNotification)
        {
            TwilioClient.Init(_accountSid, _authToken);

            var fromNumber = new PhoneNumber(_sandboxNumber);
            var toNumber = new PhoneNumber($"whatsapp:{registrationNotification.OwnerPhoneNumber}");

            string messageBody = $"""
            *Podsjetnik za registraciju ⏰*
 
            *Zdravo {registrationNotification.OwnerName} {registrationNotification.OwnerSurname},*
            Registracija Vašeg vozila *{registrationNotification.Manufacturer} {registrationNotification.Model} ({registrationNotification.YearOfManufacture}) ({registrationNotification.RegistrationPlate})*
            ističe za *{registrationNotification.DaysUntilExpiration}*.
            Napominjemo Vas da je registraciju moguće obnoviti već 30 dana prije isteka važenja prethodne registracije.
            {registrationNotification.NotificationMessage} 
            """;

            try
            {
                var message = await MessageResource.CreateAsync(
                    body: messageBody,
                    from: fromNumber,
                    to: toNumber
                );

                Console.WriteLine($"Poruka poslata sa SID: {message.Sid}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Greška prilikom slanja poruke: {ex.Message}\n{ex.StackTrace}");
            }
        }
    }
}
