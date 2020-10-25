using DataAccess.DatabaseContext;
using System.Threading.Tasks;
using Security;
using System.Linq;
using DataStorage;
using Microsoft.EntityFrameworkCore;
using System;

namespace DataAccess.Repository
{
    public class UserRepository : IUserRepository<User, Guid>
    {
        private readonly CmsContext _ctx;
        public UserRepository(CmsContext ctx)
        {
            _ctx = ctx;
        }


    }
}
