using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using DataAccess.DatabaseContext;

namespace DataMigration
{
    public class DbContextFactory : IDesignTimeDbContextFactory<CmsContext>
    {
        public CmsContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CmsContext>();
            optionsBuilder.UseSqlServer(
                connectionString: @"Data Source=(LocalDb)\MSSQLLocalDB;Initial Catalog=CmsDb;",
                sqlServerOptionsAction: builder => builder.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName)
            );
            return new CmsContext(optionsBuilder.Options);
        }
    }
}
