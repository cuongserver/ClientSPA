using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCms.Service.DTO.Output
{
    public class AuthOutput
    {
        public string DisplayName { get; set; }
        public string JwToken { get; set; }
        public List<string> Roles { get; set; }
        public string Result { get; set; }
    }
}
