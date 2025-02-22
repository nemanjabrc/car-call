using System.Text.Json.Serialization;

namespace API.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum NotificationType
    {
        EmailService = 1,
        SMSService = 2,
        WhatsAppService = 3
    }
}