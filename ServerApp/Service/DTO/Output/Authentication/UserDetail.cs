using System;
using System.Collections.Generic;
using System.Text;
namespace Service.DTO.Output.Authentication
{
    public class UserDetail
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public List<string> AccessRights { get; set; }
    }
}
