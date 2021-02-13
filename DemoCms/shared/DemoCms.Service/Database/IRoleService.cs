using DemoCms.Service.DTO.Output;
using System;
using System.Threading.Tasks;

namespace DemoCms.Service.Database
{
	public interface IRoleService
	{
		Task<RoleListOutput> GetAll();
	}
}