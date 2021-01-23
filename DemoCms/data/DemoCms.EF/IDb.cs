
using DemoCms.EF.Data;
using Microsoft.EntityFrameworkCore;

namespace DemoCms.EF
{
	public interface IDb
	{
		public DbSet<User> Users { get; set; }
		public DbSet<UserAvatarMetadata> UserAvatarMetadatas { get; set; }
	}
}
