using DemoCms.EF.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        public async Task<User> GetUserByLoginName(string loginName)
        {
            return await _ctx.Users.FirstAsync(x => x.LoginName == loginName);
        }
    }
}
