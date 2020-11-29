using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models.Request
{
    public class UserLoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
