using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class CustomAuthorizeAttribute: Attribute
    {
        public string[] Claims { get; }
        public CustomAuthorizeAttribute(params string[] claims): base()
        {
            Claims = claims;
        }
    }
}
