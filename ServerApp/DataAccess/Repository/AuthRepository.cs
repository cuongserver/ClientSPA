using DataAccess.DatabaseContext;
using System.Threading.Tasks;
using Security;
using System.Linq;
using DataStorage;
using Microsoft.EntityFrameworkCore;
using System;

namespace DataAccess.Repository
{
    public class AuthRepository : BaseRepository<User, Guid>
    {
        public AuthRepository(CmsContext ctx)
        {
            Context = ctx;
        }

    }
}
