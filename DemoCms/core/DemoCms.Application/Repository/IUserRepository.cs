using DemoCms.Domain.IdentityAndAccess;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.Application.Repository
{
    public interface IUserRepository
    {
        Task<User> GetUserByLoginName(string loginName);
        Task<User> GetUserById(Guid id);

        IQueryable<User> GetAll();
    }
}