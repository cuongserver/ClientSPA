using Service.DTO.Output.Authentication;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Repository;
using DataStorage;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository<User, Guid> _userRepo;
        public UserService(IUserRepository<User, Guid> userRepo)
        {
            _userRepo = userRepo;
        }

        public Task<OutputAuthentication> Authenticate(string userName, string password)
        {
            throw new NotImplementedException();
        }
    }
}
