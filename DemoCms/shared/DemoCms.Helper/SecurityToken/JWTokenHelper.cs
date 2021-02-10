using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace DemoCms.Helper.SecurityToken
{
	public class JWTokenHelper : IJWTokenHelper
	{


        public bool DecodeJwToken(string token, string secretKey, out IEnumerable<Claim> claims)
        {
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(secretKey);
			tokenHandler.ValidateToken(token, new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateIssuer = false,
				ValidateAudience = false,
				ValidateLifetime = false,
				ClockSkew = TimeSpan.Zero
			}, out Microsoft.IdentityModel.Tokens.SecurityToken validatedToken);
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

        public string GenerateJwToken(Guid id, string secretKey, int validPeriodInMinutes)
		{
			var tokenHandler = new JwtSecurityTokenHandler
			{
				SetDefaultTimesOnTokenCreation = false
			};
			var key = Encoding.ASCII.GetBytes(secretKey);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[] { new Claim("uid", id.ToString()) }),
				Expires = DateTime.UtcNow.AddMinutes(validPeriodInMinutes),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
