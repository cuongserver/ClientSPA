using DemoCms.RestAPI.Attributes;
using DemoCms.RestAPI.Caching;
using DemoCms.Service.Database;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Middlewares
{

    public class CustomAuthorizeMiddleware
    {
		private readonly RequestDelegate _next;
		public CustomAuthorizeMiddleware(RequestDelegate next)
		{
			_next = next;
		}
		public async Task Invoke(HttpContext context, IUserService service, PermissionCachingManager cache)
        {
			var endpoint = context.GetEndpoint();
			if (endpoint == null)
            {
				await _next.Invoke(context);
				return;
			}
			var authorizeAttr = endpoint.Metadata.OfType<CustomAuthorizeAttribute>().FirstOrDefault();
			if(authorizeAttr == null)
			{
				await _next.Invoke(context);
				return;
			}
			var userId = context.Items["uid"].ToString();
			var cacheValue = cache.GetValue(Guid.Parse(userId));
			var claims = cacheValue == null ? (await service.GetPermissionByUserId(Guid.Parse(userId))).Permissions: cacheValue.Claims;
			foreach(var claim in authorizeAttr.Claims)
            {
				if(claims.Where(x => x == claim).ToList().Count() == 0)
                {
					context.Response.StatusCode = StatusCodes.Status401Unauthorized;
					await context.Response.WriteAsync(JsonConvert.SerializeObject(new { Message = "Need Authorization" }));
					return;
				}
            }
			await _next.Invoke(context);
		}
	}
}
