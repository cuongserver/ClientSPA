using DemoCms.Application.Repository;
using DemoCms.Helper.Encryption;
using DemoCms.Helper.SecurityToken;
using DemoCms.Service.Constant;
using DemoCms.Service.DTO.Output;
using System;
using System.Threading.Tasks;

namespace DemoCms.Service.Database
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly ICrypytoHelper _crypytoHelper;
        private readonly IJWTokenHelper _tokenHelper;
        public UserService
            (
                IUserRepository userRepo,
                ICrypytoHelper crypytoHelper,
                IJWTokenHelper tokenHelper
            )
        {
            _userRepo = userRepo;
            _crypytoHelper = crypytoHelper;
            _tokenHelper = tokenHelper;
        }

        public async Task<AuthOutput> Authenticate(string password, string loginName, string secretKey, int validPeriodInMinutes)
        {
            var failed = new AuthOutput
            {
                Result = AuthMessage.AuthFailed
            };
            try
            {
                var user = await _userRepo.GetUserByLoginName(loginName);
                var computedHashPw = _crypytoHelper.GenerateHashedPassword(password, user.Salt);
                if (user.IsDeleted == true || user.PasswordHash != computedHashPw)
                {
                    return failed;
                }

                return new AuthOutput
                {
                    Result = AuthMessage.AuthSuccess,
                    DisplayName = user.DisplayName,
                    JwToken = _tokenHelper.GenerateJwtToken(user.Id, secretKey, validPeriodInMinutes)
                };
            }
            catch (InvalidOperationException)
            {
                return failed;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
