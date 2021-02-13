using DemoCms.Domain.IdentityAndAccess;
using System.Linq;

namespace DemoCms.Application.Repository
{
    public interface IRoleRepository
    {
        IQueryable<Role> GetAll();
    }
}
