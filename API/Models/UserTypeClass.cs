using System.Text.Json.Serialization;

namespace API.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserTypeClass
    {
        AdminType = 1,
        OperatorType = 2,
        OwnerType = 3
    }
}