using Service.DTO.Output.Authentication;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Repository;
using DataStorage;
using Security;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository<User, Guid> _userRepo;
        private readonly SecretEnhancer _enhancer;
        public UserService(IUserRepository<User, Guid> userRepo, SecretEnhancer enhancer)
        {
            _userRepo = userRepo;
            _enhancer = enhancer;
        }

        public async Task<OutputAuthentication> Authenticate(string password, string userName, string pepper)
        {
            var userDetail = await _userRepo.FindFirst(_userRepo.Context, user => user.UserName == userName);
            if(_enhancer.GenerateHashedPassword(password, userName, pepper) == userDetail.PasswordHash)
            {
                return new OutputAuthentication
                {
                    AuthToken = "",
                    Success = true,
                    ErrorCode = ""
                };
            }
            return new OutputAuthentication
            {
                AuthToken = "",
                Success = false,
                ErrorCode = ""
            };
        }
    }
}
