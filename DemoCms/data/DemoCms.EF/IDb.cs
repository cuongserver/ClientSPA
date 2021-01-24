
using DemoCms.EF.Data;
using Microsoft.EntityFrameworkCore;
using System;
namespace DemoCms.EF
{
    public interface IDb : IDisposable
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserAvatarMetadata> UserAvatarMetadatas { get; set; }
    }
}
