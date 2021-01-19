using Service.DTO.Output.Authentication;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Repository;
using DataStorage;
using Security;
using AutoMapper;
using Service.DTO.Output.AddMember;
using Service.DTO.Input.AddMember;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly SecretEnhancer _enhancer;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepo, SecretEnhancer enhancer, IMapper mapper)
        {
            _userRepo = userRepo;
            _enhancer = enhancer;
            _mapper = mapper;
        }

        public async Task<OutputAddMember> AddNewMember(InputAddMember member, string pepper)
        {
            var existedUser = await _userRepo.FindFirst(user => user.UserName == member.UserName);
            if (existedUser != null) return new OutputAddMember { Result = AddMemberResult.UsernameExists };
            var id = Guid.NewGuid();
            var user = new User
            {
                Id = id,
                UserName = member.UserName,
                PasswordHash = _enhancer.GenerateHashedPassword(member.Password, member.UserName, pepper)
            };
            try
            {
                await _userRepo.AddNew(user);
                return new OutputAddMember
                {
                    Id = id,
                    Result = AddMemberResult.Success
                };
            }
            catch (Exception e)
            {
                return new OutputAddMember
                {
                    Result = AddMemberResult.Error
                };
            }
        }

        public async Task<OutputAuthentication> Authenticate(string password, string userName, string pepper)
        {
            var userDetail = await _userRepo.FindFirst(user => user.UserName == userName);
            var defaultOutput = new OutputAuthentication
            {
                Result = AuthenticationResult.WrongCredential
            };

            if (userDetail == null) return defaultOutput;

            if (_enhancer.GenerateHashedPassword(password, userName, pepper) == userDetail.PasswordHash)
            {
                return new OutputAuthentication
                {
                    Result = AuthenticationResult.Success,
                    UserDetail = _mapper.Map<UserDetail>(userDetail)
                };
            }
            else
            {
                return defaultOutput;
            }

        }

        public async Task<int> UpdateAvatar(Guid imageId, Guid userId)
        {
            return await _userRepo.UpdateAvatar(imageId, userId);
        }
    }
}
