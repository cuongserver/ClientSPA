using DataStorage;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public interface IUserRepository : IBaseRepository<User, Guid>
    {
        public virtual Task<int> AddNew(User user)
        {
            Context.Users.Add(user);
            return Context.SaveChangesAsync();
        }

    }
}
