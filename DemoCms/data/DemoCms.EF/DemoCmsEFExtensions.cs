using DemoCms.Application.Repository;
using DemoCms.EF.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace DemoCms.EF
{
	public static class DemoCmsEFExtensions
	{
		public static IServiceCollection AddDemoCmsEF<T>
			(
			this IServiceCollection services,
			Action<DbContextOptionsBuilder> dboptions,
			ServiceLifetime scope = ServiceLifetime.Scoped
			) where T : DbContext, IDb
		{

			services.AddDbContext<T>(dboptions);
			services.Add(new ServiceDescriptor(typeof(IDb), typeof(T), scope));
			return services;
		}
		public static IServiceCollection AddRepository
			(
			this IServiceCollection services,
			ServiceLifetime scope = ServiceLifetime.Scoped
			)
		{
			services.Add(new ServiceDescriptor(typeof(IUserRepository), typeof(UserRepository), scope));
			services.Add(new ServiceDescriptor(typeof(IPermissionRepository), typeof(PermissionRepository), scope));
			services.Add(new ServiceDescriptor(typeof(IRoleAssignmentRepository), typeof(RoleAssignmentRepository), scope));
			services.Add(new ServiceDescriptor(typeof(IRoleRepository), typeof(RoleRepository), scope));
			return services;
		}
	}
}
