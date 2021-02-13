using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCms.Service.Database
{
    public interface IPermissionService
    {
        Dictionary<string, List<string>> AllPermissions();
    }
}
