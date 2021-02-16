using DemoCms.Service.DTO.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Models
{
    public class AuthResponse
    {
        public string DisplayName { get; set; }
        public string JwToken { get; set; }
        public List<string> Permissions { get; set; }
        public string Result { get; set; }
    }
}
