using DemoCms.Service.DTO.Input;
using DemoCms.Service.DTO.Output;
using System;
using System.Threading.Tasks;

namespace DemoCms.Service.Database
{
	public interface IRoleService
	{
		Task<RoleListOutput> GetAll();
		Task<RoleCreateOrEditOutput> CreateRole(RoleCreateOrEditInput input);

		Task<RoleDetailsOutput> GetRoleDetailsById(Guid roleId);
	}
}