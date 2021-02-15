using DemoCms.RestAPI.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.ModelValidators
{
    public class RoleCreateOrEditValidator: AbstractValidator<RoleCreateOrEditRequest>
    {
        public RoleCreateOrEditValidator()
        {
            RuleFor(x => x.Name).NotEmpty().NotNull();
            RuleFor(x => x.Claims).ForEach(x => x.NotEmpty().NotNull()).Must(x => x.Count() > 0).Must(NotBeDuplicate);
        }
        private bool NotBeDuplicate(IEnumerable<string> claims)
        {
            return claims.GroupBy(x => x).Count() == claims.Count();
        }
    }
}
