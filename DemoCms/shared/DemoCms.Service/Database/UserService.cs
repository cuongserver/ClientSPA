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
        private readonly IHashHelper _hashHelper;
        private readonly IJWTokenHelper _tokenHelper;
        public UserService
            (
                IUserRepository userRepo,
                IHashHelper hashHelper,
                IJWTokenHelper tokenHelper
            )
        {
            _userRepo = userRepo;
            _hashHelper = hashHelper;
            _tokenHelper = tokenHelper;
        }

        public async Task<AuthOutput> Authenticate(string password, string loginName, string pepper, string secretKey, int validPeriodInMinutes)
        {
            var failed = new AuthOutput
            {
                Result = AuthMessage.AuthFailed
            };
            try
            {
                var user = await _userRepo.GetUserByLoginName(loginName);
                var computedHashPw = _hashHelper.GenerateHashedPassword(password, loginName, pepper);
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
