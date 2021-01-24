using DemoCms.EF.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace DemoCms.EF
{
    public class Db<T> : DbContext, IDb where T : Db<T>
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserAvatarMetadata> UserAvatarMetadatas { get; set; }
        public Db(DbContextOptions<T> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<User>().ToTable("Users");
            mb.Entity<User>().HasKey(x => new { x.Id });

            mb.Entity<UserAvatarMetadata>().ToTable("UserAvatarMetadatas");
            mb.Entity<User>().HasKey(x => new { x.Id });

        }

    }

}
