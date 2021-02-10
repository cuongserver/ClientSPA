using DemoCms.Domain.IdentityAndAccess;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoCms.Application.Repository
{
    public interface IPermissionRepository
    {
        Task<List<Permission>> GetPermissionByRoleId(Guid roleId);
    }
}
