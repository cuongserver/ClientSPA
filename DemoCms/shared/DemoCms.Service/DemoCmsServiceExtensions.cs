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

			return services;
		}
	}
}
