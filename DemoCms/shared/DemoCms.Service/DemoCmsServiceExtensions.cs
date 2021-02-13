using DemoCms.Service.Database;
using Microsoft.Extensions.DependencyInjection;

namespace DemoCms.Service
{
	public static class DemoCmsServiceExtensions
	{
		public static IServiceCollection AddServices
			(
			this IServiceCollection services,
			ServiceLifetime scope = ServiceLifetime.Scoped
			)
		{
			services.Add(new ServiceDescriptor(typeof(IUserService), typeof(UserService), scope));
			services.Add(new ServiceDescriptor(typeof(IRoleService), typeof(RoleService), scope));
			services.Add(new ServiceDescriptor(typeof(IPermissionService), typeof(PermissionService), scope));
			return services;
		}
	}
}
