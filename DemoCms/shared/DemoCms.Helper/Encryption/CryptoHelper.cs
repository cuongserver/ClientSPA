using Google.Authenticator;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace DemoCms.Helper.Encryption
{
    public class CryptoHelper : ICryptoHelper
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

        public List<string> GenerateMfaKey(Guid userId)
        {
            var sha1 = new SHA1Managed();
            var randomString = Guid.NewGuid().ToString();
            var randomStringInByteArray = Encoding.UTF8.GetBytes(randomString + userId.ToString());
            var userSecret = string.Concat(sha1.ComputeHash(randomStringInByteArray).Select(b => b.ToString("X2")));

            var tfa = new TwoFactorAuthenticator();
            var setupCode = tfa.GenerateSetupCode("democms.com", userId.ToString(), userSecret, false);
            return new List<string> { setupCode.QrCodeSetupImageUrl, userSecret };
        }

        public bool ValidateMfaPIN(string secretKey, string PIN)
        {
            var tfa = new TwoFactorAuthenticator();
            return tfa.ValidateTwoFactorPIN(secretKey, PIN, TimeSpan.FromSeconds(60));
        }
    }
}
