using System;
using System.Collections.Generic;

namespace DemoCms.Helper.Encryption
{
    public interface ICryptoHelper
    {
        string GenerateSalt(string loginName);
        string GenerateHashedPassword(string password, string salt);
        List<string> GenerateMfaKey(Guid userId);
        bool ValidateMfaPIN(string secretKey, string PIN);
    }
}