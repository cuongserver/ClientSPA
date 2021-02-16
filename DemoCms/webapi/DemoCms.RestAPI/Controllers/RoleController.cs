using DemoCms.Domain.IdentityAndAccess;
using DemoCms.RestAPI.Attributes;
using DemoCms.RestAPI.Models;
using DemoCms.Service.Database;
using DemoCms.Service.DTO.Input;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IConfiguration _configuration;
        private readonly IPermissionService _permissionService;
        private readonly IValidator<RoleCreateOrEditRequest> _roleCreateOrEditValidator;

        public RoleController(
            IRoleService roleService, 
            IConfiguration configuration, 
            IPermissionService permissionService, 
            IValidator<RoleCreateOrEditRequest> roleCreateOrEditValidator)

        {
            _roleService = roleService;
            _configuration = configuration;
            _permissionService = permissionService;
            _roleCreateOrEditValidator = roleCreateOrEditValidator;
        }

        [HttpGet("get-all")]
        [CustomAuthorize(RolesPermission.List)]
        public async Task<IActionResult> GetAll()
        {
            var res = await _roleService.GetAll();
            return Ok(res);
        }

        [HttpGet("get-all-permissions-for-create")]
        [CustomAuthorize(RolesPermission.Create)]
        public IActionResult GetAllPermissionsForCreate()
        {
            var res = _permissionService.AllPermissions();
            return Ok(res);
        }

        [HttpPost("create-role")]
        [CustomAuthorize(RolesPermission.Create)]
        public async Task<IActionResult> CreateOrEditRole(RoleCreateOrEditRequest request)
        {
            var validationResult = await _roleCreateOrEditValidator.ValidateAsync(request);
            if (!validationResult.IsValid) return BadRequest(validationResult.Errors);
            if (request.Id != null) return BadRequest();
            var input = new RoleCreateOrEditInput
            {
                Id = request.Id,
                Claims = request.Claims,
                Name = request.Name
            };
            var res = await _roleService.CreateRole(input);
            return Ok(res);
        }

        [HttpGet("view-role")]
        [CustomAuthorize(RolesPermission.Edit)]
        public async Task<IActionResult> ViewRole(Guid roleId)
        {
            var res = await _roleService.GetRoleDetailsById(roleId);
            Thread.Sleep(5000);
            return Ok(res);
        }
    }
}
