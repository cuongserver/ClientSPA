using System;
using System.Collections.Generic;
using System.Text;
using OtpNet;

namespace DemoCms.Helper.Encryption
{
    public class OtpHandler
    {
        public void GenerateOtp()
        {
            var totp = new Totp(Base32Encoding.ToBytes("supersecret"));
        }
    }
}
