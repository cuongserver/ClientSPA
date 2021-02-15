
using DemoCms.Domain.IdentityAndAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DemoCms.EF
{
    public interface IDb : IDisposable
    {
        DbSet<User> Users { get; set; }
        DbSet<UserAvatarMetadata> UserAvatarMetadatas { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<Permission> Permissions { get; set; }
        DbSet<RoleAssignment> RoleAssignments { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));

        DatabaseFacade Database { get; }
    }
}
