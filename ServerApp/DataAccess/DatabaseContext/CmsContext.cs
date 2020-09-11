using Microsoft.EntityFrameworkCore;
using DataStorage;
namespace DataAccess.DatabaseContext
{
    public class CmsContext : DbContext
    {
        public CmsContext(DbContextOptions<CmsContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}

