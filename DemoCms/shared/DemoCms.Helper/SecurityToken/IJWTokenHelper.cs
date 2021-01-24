using System;

namespace DemoCms.Helper.SecurityToken
{
	public interface IJWTokenHelper
	{
		string GenerateJwtToken(Guid id, string secretKey, int validPeriodInMinutes);
	}
}