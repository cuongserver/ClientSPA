using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Service.DTO.Output.Authentication;

namespace RestAPI.Models.Response
{
    public class UserLoginResponse : OutputAuthentication
    {
        public string Token { get; set; }
    }
}
