using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Caching
{
    public class PermissionModelForCaching
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
        public List<string> Claims { get; set; }
    }
}
