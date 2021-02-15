using DemoCms.RestAPI.Models;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.ModelValidators
{
    public static class FluentValidationServiceExtension
    {
        public static IServiceCollection ApplyFluentValidation(this IServiceCollection services, ServiceLifetime scope = ServiceLifetime.Scoped)
        {
            services.Add(new ServiceDescriptor(typeof(IValidator<RoleCreateOrEditRequest>), typeof(RoleCreateOrEditValidator), scope));
            return services;
        }
    }
}
