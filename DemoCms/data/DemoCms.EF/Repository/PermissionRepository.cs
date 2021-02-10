using DemoCms.Application.Repository;
using DemoCms.Domain.IdentityAndAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.EF.Repository
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly IDb _ctx;
        public PermissionRepository
            (
                IDb ctx
            )
        {
            _ctx = ctx;
        }


        public async Task<List<Permission>> GetPermissionByRoleId(Guid roleId)
        {
            return await _ctx.Permissions.Where(x => x.RoleId == roleId && !x.IsDeleted).ToListAsync();
        }
    }
}
