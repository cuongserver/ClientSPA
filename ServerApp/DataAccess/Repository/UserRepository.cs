using DataAccess.DatabaseContext;
using System.Threading.Tasks;
using Security;
using System.Linq;
using DataStorage;
using Microsoft.EntityFrameworkCore;
using System;

namespace DataAccess.Repository
{
    public class UserRepository : BaseRepository<User, Guid>, IUserRepository
    {
        public UserRepository(CmsContext ctx) : base(ctx)
        {

        }


    }
}
