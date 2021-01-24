﻿using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DemoCms.Helper.SecurityToken
{
	public class JWTokenHelper : IJWTokenHelper
	{
		public string GenerateJwtToken(Guid id, string secretKey, int validPeriodInMinutes)
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
