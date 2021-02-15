using DemoCms.Application.Repository;
using DemoCms.Domain.IdentityAndAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.EF.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IDb _ctx;
        public RoleRepository
            (
                IDb ctx
            )
        {
            _ctx = ctx;
        }

        public Task<int> CreateRole(Role role)
        {
            _ctx.Roles.Add(role);
            return _ctx.SaveChangesAsync();
        }

        public IQueryable<Role> GetAll()
        {
            return _ctx.Roles;
        }
    }
}
