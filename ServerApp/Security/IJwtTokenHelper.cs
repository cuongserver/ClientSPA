using System;

namespace Security
{
    public interface IJwtTokenHelper
    {
        string GenerateJwtToken(Guid id, string secretKey, int validPeriodInMinutes);
    }
}