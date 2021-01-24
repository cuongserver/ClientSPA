using System;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Linq;

namespace DemoCms.Helper.Encryption
{
    public class HashHelper : IHashHelper
    {
        public string GenerateHashedPassword(string password, string loginName, string pepper)
        {
            var sha1 = new SHA1Managed();
            var hashUserName1 = sha1.ComputeHash(Encoding.UTF8.GetBytes(loginName));
            var salt1 = string.Concat(hashUserName1.Select(b => b.ToString("x2")));

            var hash2 = sha1.ComputeHash(Encoding.UTF8.GetBytes(salt1 + pepper));

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: password + pepper,
                    salt: hash2,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 10,
                    numBytesRequested: 256 / 8
                ));
            return hashedPassword;

        }
    }
}
