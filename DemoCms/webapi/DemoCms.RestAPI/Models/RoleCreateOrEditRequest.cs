using System;

namespace DemoCms.RestAPI.Models
{
    public class RoleCreateOrEditRequest
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string[] Claims { get; set; }
    }
}
