using Microsoft.EntityFrameworkCore;
namespace DemoCms.EF.MsSqlServer
{
    public class MsSqlServerDb : Db<MsSqlServerDb>
    {
        public MsSqlServerDb(DbContextOptions<MsSqlServerDb> options) : base(options)
        {
        }
    }
}
