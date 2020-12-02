using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace RestAPI.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;
        public JwtMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
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
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token == null)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("");
                return;
            }
            var isTokenValid = ValidateToken(token, out IEnumerable<Claim> claims);
            if (!isTokenValid)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new { Message = "Unknown Authentication" }));
                return;
            }
            foreach (var claim in claims) context.User.Claims.Append(claim);
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
            try
            {
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
                var now = (Int64)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds + 3600;
                if (now > expiredAt)
                {
                    claims = null;
                    return false;
                }


                claims = jwtToken.Claims;
                return true;
            }
            catch (Exception)
            {
                claims = null;
                return false;
            }

        }
    }
}
