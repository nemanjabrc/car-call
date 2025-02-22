using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace API.Helpers.Password
{
    public static class PasswordGeneratorHelper
    {
        public static string GeneratePassword()
        {
            const int length = 8;
            const string upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string lowerChars = "abcdefghijklmnopqrstuvwxyz";
            const string digits = "1234567890";
            const string specialChars = "#$%&";
            const string allChars = upperChars + lowerChars + digits + specialChars;

            var password = new char[length];
            var randomBytes = new byte[length];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
            }

            password[0] = upperChars[randomBytes[0] % upperChars.Length];
            password[1] = lowerChars[randomBytes[1] % lowerChars.Length];
            password[2] = digits[randomBytes[2] % digits.Length];
            password[3] = specialChars[randomBytes[3] % specialChars.Length];

            for (int i = 4; i < length; i++)
            {
                password[i] = allChars[randomBytes[i] % allChars.Length];
            }

            // Nasumicno permutovanje lozinke
            return new string(password.OrderBy(_ => Guid.NewGuid()).ToArray());
        }
    }
}