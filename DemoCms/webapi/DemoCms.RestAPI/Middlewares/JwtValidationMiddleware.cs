using DemoCms.Helper.SecurityToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Middlewares
{
	public class JwtValidationMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly IConfiguration _configuration;
		public JwtValidationMiddleware(RequestDelegate next, IConfiguration configuration)
		{
			_next = next;
			_configuration = configuration;
		}

		public async Task Invoke(HttpContext context, IJWTokenHelper helper)
		{
			var endpoint = context.GetEndpoint();
			if (endpoint != null)
			{
				var isAllowAnonymous = endpoint.Metadata.OfType<AllowAnonymousAttribute>().Count() > 0;
				if (isAllowAnonymous)
				{
					await _next.Invoke(context);
					return;
				}
			}
			var token = context.Request.Headers["Authorization"].FirstOrDefault();
			if (token == null)
			{
				context.Response.StatusCode = StatusCodes.Status401Unauthorized;
				await context.Response.WriteAsync("");
				return;
			}

			var secretKey = _configuration.GetValue<string>("Security:Secret");
			var isTokenValid = helper.DecodeJwToken(token, secretKey, out IEnumerable<Claim> claims);
			if (!isTokenValid)
			{
				context.Response.StatusCode = StatusCodes.Status401Unauthorized;
				await context.Response.WriteAsync(JsonConvert.SerializeObject(new { Message = "Unknown Authentication" }));
				return;
			}

			foreach (var claim in claims)
			{
				context.Items.Add(claim.Type, claim.Value);
			}


			await _next.Invoke(context);
		}
	}
}
