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
            mb.Entity<User>().Property(x => x.Id).HasDefaultValue(Guid.NewGuid());

        }

    }

}
