using DataStorage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DataAccess.DatabaseContext
{
    public class CmsContext : DbContext
    {
        private readonly ILoggerFactory _loggerFactory;
        public CmsContext(DbContextOptions<CmsContext> options) : base(options)
        {

        }

        public CmsContext(DbContextOptions<CmsContext> options, ILoggerFactory loggerFactory) : base(options)
        {
            _loggerFactory = loggerFactory;

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(_loggerFactory);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<AvatarImage> AvatarImages { get; set; }
    }
}

