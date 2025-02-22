using System.Text.Json.Serialization;

namespace API.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserType
    {
        SuperAdminType = 0,
        AdminType = 1,
        OperatorType = 2,
        OwnerType = 3
    }
}