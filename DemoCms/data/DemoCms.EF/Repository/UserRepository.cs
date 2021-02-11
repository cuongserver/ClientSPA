using DemoCms.Application.Repository;
using DemoCms.Domain.IdentityAndAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.EF.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDb _ctx;
        public UserRepository
            (
                IDb ctx
            )
        {
            _ctx = ctx;
        }


        public async Task<User> GetUserById(Guid id)
        {
            return await _ctx.Users.FirstAsync(x => x.Id == id);
        }

        public async Task<User> GetUserByLoginName(string loginName)
        {
            return await _ctx.Users.FirstAsync(x => x.LoginName == loginName);
        }

        public IQueryable<User> GetAll()
        {
            return _ctx.Users;
        }
    }
}
