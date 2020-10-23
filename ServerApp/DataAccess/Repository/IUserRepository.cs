using DataStorage;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public interface IUserRepository
    {
        Task<User> FindFirst(Expression<Func<User, bool>> predicate);

    }
}
