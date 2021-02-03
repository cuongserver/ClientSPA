using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace DemoCms.Helper.Encryption
{
    public class CryptoHelper : ICrypytoHelper
    {

        public string GenerateSalt(string loginName)
        {
            var sha1 = new SHA1Managed();
            var randomString = Guid.NewGuid().ToString();
            var randomStringInByteArray = Encoding.UTF8.GetBytes(randomString + loginName);
            return string.Concat(sha1.ComputeHash(randomStringInByteArray).Select(b => b.ToString("x2")));
        }

        public string GenerateHashedPassword(string password, string salt)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Encoding.UTF8.GetBytes(salt),
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10,
                numBytesRequested: 256 / 8
                ));
            return hashedPassword;
        }
    }
}
