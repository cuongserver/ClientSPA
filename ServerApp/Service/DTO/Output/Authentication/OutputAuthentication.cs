using System;
using System.Collections.Generic;
using System.Text;
using DataStorage;
namespace Service.DTO.Output.Authentication
{
    public class OutputAuthentication
    {
        public UserDetail UserDetail { get; set; }
        public AuthenticationResult Result { get; set; }

    }

    public enum AuthenticationResult
    {
        Success,
        WrongCredential,
    }

}
