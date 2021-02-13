using DemoCms.Domain.IdentityAndAccess;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCms.Service.Database
{
    public class PermissionService : IPermissionService
    {
        public Dictionary<string, List<string>> AllPermissions()
        {
            var dict = new Dictionary<string, List<string>>
            {
                { typeof(UsersPermission).Name, UsersPermission.All() },
                { typeof(RolesPermission).Name, RolesPermission.All() }
            };
            return dict;
        }
    }
}
