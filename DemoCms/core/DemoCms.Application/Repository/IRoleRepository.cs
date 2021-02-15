using DemoCms.Domain.IdentityAndAccess;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.Application.Repository
{
    public interface IRoleRepository
    {
        IQueryable<Role> GetAll();
        Task<int> CreateRole(Role role);
    }
}
