using DemoCms.Domain.IdentityAndAccess;
using DemoCms.RestAPI.Attributes;
using DemoCms.Service.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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

        public RoleController(IRoleService roleService, IConfiguration configuration, IPermissionService permissionService)
        {
            _roleService = roleService;
            _configuration = configuration;
            _permissionService = permissionService;
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

    }
}
