using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
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

		public async Task Invoke(HttpContext context)
		{
			await _next.Invoke(context);
		}

		/// <summary>
		/// Validate token authentication + expiration
		/// </summary>
		private bool ValidateToken(string token, out IEnumerable<Claim> claims)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var jwtSecret = _configuration.GetValue<string>("Security:JwtSecret");
			var jwtExpireAfter = _configuration.GetValue<int>("Security:JwtExpireAfter");
			var key = Encoding.ASCII.GetBytes(jwtSecret);

			tokenHandler.ValidateToken(token, new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateIssuer = false,
				ValidateAudience = false,
				ValidateLifetime = false,
				// set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
				ClockSkew = TimeSpan.Zero
			}, out SecurityToken validatedToken);

			var jwtToken = (JwtSecurityToken)validatedToken;
			var expiredAt = Convert.ToInt64(jwtToken.Claims.First(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
			var now = (Int64)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
			if (now > expiredAt)
			{
				claims = null;
				return false;
			}


			claims = jwtToken.Claims;
			return true;
		}
	}
}
