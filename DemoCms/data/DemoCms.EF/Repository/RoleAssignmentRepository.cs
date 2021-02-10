using DemoCms.Application.Repository;
using DemoCms.Domain.IdentityAndAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DemoCms.EF.Repository
{
    public class RoleAssignmentRepository : IRoleAssignmentRepository
    {
        private readonly IDb _ctx;
        public RoleAssignmentRepository
            (
                IDb ctx
            )
        {
            _ctx = ctx;
        }

        public async Task<RoleAssignment> GetAssignementByUserId(Guid userId)
        {
            return await _ctx.RoleAssignments.FirstAsync(x => x.UserId == userId && !x.IsDeleted);
        }
    }
}
