using DemoCms.Helper.Encryption;
using DemoCms.Helper.SecurityToken;
using Microsoft.Extensions.DependencyInjection;

namespace DemoCms.Helper
{
	public static class DemoCmsHelperExtensions
	{
		public static IServiceCollection AddHelpers
			(
			this IServiceCollection services,
			ServiceLifetime scope = ServiceLifetime.Scoped
			)
		{
			services.Add(new ServiceDescriptor(typeof(IHashHelper), typeof(HashHelper), scope));
			services.Add(new ServiceDescriptor(typeof(IJWTokenHelper), typeof(JWTokenHelper), scope));
			return services;
		}
	}
}
