using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCms.Service.DTO.Output
{
    public class RoleDetailsOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Dictionary<string, List<string>> Claims { get; set; }
    }
}
