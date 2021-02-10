using System;
using System.Security.Claims;
using System.Collections.Generic;

namespace DemoCms.Helper.SecurityToken
{
	public interface IJWTokenHelper
	{
		string GenerateJwToken(Guid id, string secretKey, int validPeriodInMinutes);
		bool DecodeJwToken(string token, string secretKey, out IEnumerable<Claim> claims);
	}
}