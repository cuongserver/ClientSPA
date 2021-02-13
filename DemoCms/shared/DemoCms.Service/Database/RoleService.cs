using DemoCms.Application.Repository;
using DemoCms.Service.DTO.Output;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.Service.Database
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public async Task<RoleListOutput> GetAll()
        {
            var list = await _roleRepository.GetAll().Where(x => !x.IsDeleted).ToListAsync();
            return new RoleListOutput
            {
                Roles = list
            };
        }
    }
}
