using DemoCms.RestAPI.Models;
using DemoCms.Service.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class UserController : ControllerBase
	{
		private readonly IUserService _userService;
		private readonly IConfiguration _configuration;
		public UserController
			(
				IUserService userService,
				IConfiguration configuration
			)
		{
			_userService = userService;
			_configuration = configuration;
		}

		[HttpPost("auth")]
		public async Task<IActionResult> Login([FromBody] AuthRequest request)
		{
			var pepper = _configuration.GetValue<string>("Security:Pepper");
			var secret = _configuration.GetValue<string>("Security:Secret");
			var validPeriod = _configuration.GetValue<int>("Security:ValidPeriod");
			var res = await _userService.Authenticate(request.Password, request.LoginName, pepper, secret, validPeriod);
			return Ok(res);
		}
	}
}
