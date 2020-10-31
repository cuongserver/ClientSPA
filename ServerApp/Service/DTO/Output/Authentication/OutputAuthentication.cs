using System;
using System.Collections.Generic;
using System.Text;
using Service.DTO.Output;
using DataStorage;
namespace Service.DTO.Output.Authentication
{
    public class OutputAuthentication : OutputBase
    {
        public string AuthToken { get; set; }
        public UserDetail UserDetail { get; set; }
    }
}
