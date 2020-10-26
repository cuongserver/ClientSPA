using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RestAPI.Models.Request;
using Service;
using System.Threading.Tasks;
namespace RestAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserCredential credential)
        {
            var pepper = _configuration.GetValue<string>("Security:Pepper");
            var result = await _userService.Authenticate(credential.Password, credential.Username, pepper);
            return Ok(result);
        }
    }
}
