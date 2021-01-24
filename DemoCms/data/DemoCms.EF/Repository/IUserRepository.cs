using DemoCms.EF.Data;
using System.Threading.Tasks;

namespace DemoCms.EF.Repository
{
    public interface IUserRepository
    {
        Task<User> GetUserByLoginName(string loginName);
    }
}