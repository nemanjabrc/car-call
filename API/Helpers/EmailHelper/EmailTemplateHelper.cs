using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers.EmailHelper
{
    public static class EmailTemplateHelper
    {
        public static string GetEmailBody(string templatePath, Dictionary<string, string> placeholders)
        {
            string emailBody = File.ReadAllText(templatePath);

            foreach (var placeholder in placeholders)
            {
                emailBody = emailBody.Replace($"{{{placeholder.Key}}}", placeholder.Value);
            }

            return emailBody;
        }
    }
}