using Service.DTO.Output.Authentication;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Repository;
using DataStorage;
using Security;
using AutoMapper;
namespace Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository<User, Guid> _userRepo;
        private readonly SecretEnhancer _enhancer;
        private readonly IMapper _mapper;
        public UserService(IUserRepository<User, Guid> userRepo, SecretEnhancer enhancer, IMapper mapper)
        {
            _userRepo = userRepo;
            _enhancer = enhancer;
            _mapper = mapper;
        }

        public async Task<OutputAuthentication> Authenticate(string password, string userName, string pepper)
        {
            var userDetail = await _userRepo.FindFirst(_userRepo.Context, user => user.UserName == userName);

            if (_enhancer.GenerateHashedPassword(password, userName, pepper) == userDetail.PasswordHash)
            {
                return new OutputAuthentication
                {
                    Result = AuthenticationResult.Success,
                    UserDetail = _mapper.Map<UserDetail>(userDetail)
                };
            }
            return new OutputAuthentication
            {
                Result = AuthenticationResult.WrongCredential
            };
        }
    }
}
