using DemoCms.Application.Repository;
using DemoCms.Domain.IdentityAndAccess;
using DemoCms.EF;
using DemoCms.Service.Constant;
using DemoCms.Service.DTO.Input;
using DemoCms.Service.DTO.Output;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.Service.Database
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IDb _context;
        private readonly IPermissionRepository _permissionRepository;

        public RoleService( IRoleRepository roleRepository, IDb context, IPermissionRepository permissionRepository)
        {
            _roleRepository = roleRepository;
            _context = context;
            _permissionRepository = permissionRepository;
        }

        public async Task<RoleCreateOrEditOutput> CreateRole(RoleCreateOrEditInput input)
        {
            var output = new RoleCreateOrEditOutput();
            var isRoleNameExist = await _roleRepository
                .GetAll()
                .Where(x => x.Name == input.Name.Trim() && !x.IsDeleted)
                .AnyAsync();
            if (isRoleNameExist)
            {
                output.Result = RoleCreateOrEditMessage.RoleNameExist;
                return output;
            }
            var id = Guid.NewGuid();
            using(var tran = _context.Database.BeginTransaction())
            {
                await _roleRepository.CreateRole(new Role
                {
                    Id = id,
                    Name = input.Name
                });
                var list = new List<Permission>();
                foreach(var claim in input.Claims)
                {
                    list.Add(new Permission
                    {
                        Id = Guid.NewGuid(),
                        Category = RoleCategory.GetCategory(claim),
                        Claim = claim,
                        RoleId = id
                    });
                }
                await _permissionRepository.CreatePermissionByRoleId(list);
                tran.Commit();
            }
            output.Id = id;
            output.Result = RoleCreateOrEditMessage.RoleCreateSuccess;
            return output;
        }

        public async Task<RoleListOutput> GetAll()
        {
            var list = await _roleRepository.GetAll().Where(x => !x.IsDeleted).ToListAsync();
            return new RoleListOutput
            {
                Roles = list
            };
        }

        public async Task<RoleDetailsOutput> GetRoleDetailsById(Guid roleId)
        {
            var query = from a in _roleRepository.GetAll()
                        join b in _permissionRepository.GetAll()
                        on a.Id equals b.RoleId
                        where a.Id == roleId && a.IsDeleted == false
                        select new
                        {
                            Id = a.Id,
                            Name = a.Name,
                            Claims = b
                        };
            var output = await query.ToListAsync();
            if (output.Count() == 0) return null;
            return new RoleDetailsOutput
            {
                Id = output.First().Id,
                Name = output.First().Name,
                Claims = output.GroupBy(x => x.Claims.Category).ToDictionary(x => x.Key, y => y.Select(z => z.Claims.Claim).ToList())
            };
        }


    }
}
