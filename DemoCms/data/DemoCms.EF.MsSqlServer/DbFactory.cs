using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DemoCms.EF.MsSqlServer
{
    public class DbFactory : IDesignTimeDbContextFactory<MsSqlServerDb>
    {
        public MsSqlServerDb CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MsSqlServerDb>();
            builder.UseSqlServer(@"Data Source=(LocalDb)\MSSQLLocalDB;Initial Catalog=DemoCms;");
            return new MsSqlServerDb(builder.Options);
        }
    }
}
