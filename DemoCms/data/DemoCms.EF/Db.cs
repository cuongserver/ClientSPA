using DemoCms.Domain.IdentityAndAccess;
using Microsoft.EntityFrameworkCore;
using System;

namespace DemoCms.EF
{
    public class Db<T> : DbContext, IDb where T : Db<T>
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserAvatarMetadata> UserAvatarMetadatas { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RoleAssignment> RoleAssignments { get; set; }

        public Db(DbContextOptions<T> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<User>().ToTable("Users");
            mb.Entity<User>().HasKey(x => new { x.Id });

            mb.Entity<UserAvatarMetadata>().ToTable("UserAvatarMetadatas");
            mb.Entity<User>().HasKey(x => new { x.Id });

            mb.Entity<Role>().ToTable("Roles");
            mb.Entity<Role>().HasKey(x => new { x.Id });

            mb.Entity<Permission>().ToTable("Permissions");
            mb.Entity<Permission>().HasKey(x => new { x.Id });
            mb.Entity<Permission>().HasIndex(x => x.Claim);

            mb.Entity<RoleAssignment>().ToTable("RoleAssignments");
            mb.Entity<RoleAssignment>().HasKey(x => new { x.Id });

        }

    }

}
