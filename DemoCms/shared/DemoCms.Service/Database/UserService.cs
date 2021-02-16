using DemoCms.Application.Repository;
using DemoCms.Helper.Encryption;
using DemoCms.Helper.SecurityToken;
using DemoCms.Service.Constant;
using DemoCms.Service.DTO.Output;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DemoCms.Service.Database
{
    public class UserService : IUserService
    {
        #region Fields

        private readonly ICryptoHelper _crypytoHelper;

        private readonly IPermissionRepository _permissionRepo;

        private readonly IRoleAssignmentRepository _roleAssignmentRepo;

        private readonly IJWTokenHelper _tokenHelper;

        private readonly IUserRepository _userRepo;

        #endregion

        #region Constructors

        public UserService
            (
                IUserRepository userRepo,
                ICryptoHelper crypytoHelper,
                IJWTokenHelper tokenHelper,
                IRoleAssignmentRepository roleAssignmentRepo,
                IPermissionRepository permissionRepo
            )
        {
            _userRepo = userRepo;
            _crypytoHelper = crypytoHelper;
            _tokenHelper = tokenHelper;
            _roleAssignmentRepo = roleAssignmentRepo;
            _permissionRepo = permissionRepo;
        }

        #endregion

        #region Methods

        public async Task<AuthOutput> Authenticate(string password, string loginName, string secretKey, int validPeriodInMinutes)
        {
            var failed = new AuthOutput
            {
                Result = AuthMessage.AuthFailed
            };
            try
            {
                var query = from a in _userRepo.GetAll()
                            join b in _roleAssignmentRepo.GetAll() on a.Id equals b.UserId
                            join c in _permissionRepo.GetAll() on b.RoleId equals c.RoleId
                            where a.LoginName == loginName && !a.IsDeleted && !b.IsDeleted && !c.IsDeleted
                            select new
                            {
                                User = a,
                                RoleAssignment = b,
                                Claim = c
                            };
                var output = await query.ToListAsync();
                if (output.Count == 0)
                {
                    return failed;
                }

                var credential = output.First().User;
                var computedHashPw = _crypytoHelper.GenerateHashedPassword(password, credential.Salt);
                if (credential.PasswordHash != computedHashPw)
                {
                    return failed;
                }

                return new AuthOutput
                {
                    Result = AuthMessage.AuthSuccess,
                    DisplayName = credential.DisplayName,
                    JwToken = _tokenHelper.GenerateJwToken(credential.Id, secretKey, validPeriodInMinutes),
                    Permissions = output.Select(x => x.Claim.Claim).ToList(),
                    UserId = credential.Id,
                    RoleId = output.First().RoleAssignment.RoleId
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

        public async Task<AuthOutput> Authenticate(string token, string secretKey)
        {
            var failed = new AuthOutput
            {
                Result = AuthMessage.AuthFailed
            };
            try
            {
                var result = _tokenHelper.DecodeJwToken(token, secretKey, out IEnumerable<Claim> claims);
                if (result == false)
                {
                    return failed;
                }

                var id = claims.First(x => x.Type == "uid").Value;
                var user = await _userRepo.GetUserById(Guid.Parse(id));
                if (user.IsDeleted == true)
                {
                    return failed;
                }

                return new AuthOutput
                {
                    Result = AuthMessage.AuthSuccess,
                    DisplayName = user.DisplayName,
                    JwToken = token
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

        public async Task<AuthOutput> GetPermissionByUserId(Guid userId)
        {
            var failed = new AuthOutput
            {
                Result = AuthMessage.AuthFailed
            };
            try
            {
                var query = from a in _userRepo.GetAll()
                            join b in _roleAssignmentRepo.GetAll() on a.Id equals b.UserId
                            join c in _permissionRepo.GetAll() on b.RoleId equals c.RoleId
                            where a.Id == userId && !a.IsDeleted && !b.IsDeleted && !c.IsDeleted
                            select c;
                var output = await query.ToListAsync();
                return new AuthOutput
                {
                    Permissions = output.Select(x => x.Claim).ToList()
                };

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion
    }
}
