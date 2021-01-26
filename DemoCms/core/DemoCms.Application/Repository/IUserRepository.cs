using DemoCms.Domain.IdentityAndAccess;
using System.Threading.Tasks;

namespace DemoCms.Application.Repository
{
    public interface IUserRepository
    {
        Task<User> GetUserByLoginName(string loginName);
    }
}