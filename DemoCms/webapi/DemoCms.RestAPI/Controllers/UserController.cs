using DemoCms.Helper.Encryption;
using DemoCms.RestAPI.Caching;
using DemoCms.RestAPI.Models;
using DemoCms.Service.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Controllers
{
    [ApiController]
	[Route("[controller]")]
	public class UserController : ControllerBase
	{
		private readonly IUserService _userService;
		private readonly IConfiguration _configuration;
		private readonly PermissionCachingManager _cache;
		private readonly ICryptoHelper _cryptoHelper;
		public UserController
			(
				IUserService userService,
				IConfiguration configuration,
				PermissionCachingManager cache,
			    ICryptoHelper cryptoHelper
			)
		{
			_userService = userService;
			_configuration = configuration;
			_cache = cache;
			_cryptoHelper = cryptoHelper;
		}

		[HttpPost("auth")]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] AuthRequest request)
		{
			var secret = _configuration.GetValue<string>("Security:Secret");
			var validPeriod = _configuration.GetValue<int>("Security:ValidPeriod");
			var res = await _userService.Authenticate(request.Password, request.LoginName, secret, validPeriod);
			_cache.AddValue(new PermissionModelForCaching
			{ 
				UserId = res.UserId,
				RoleId = res.RoleId,
				Claims = res.Permissions
			});
			return Ok(new AuthResponse
			{ 
				DisplayName = res.DisplayName,
				JwToken = res.JwToken,
				Permissions = res.Permissions,
				Result = res.Result
			});
		}

		[HttpGet("restore-session")]
		public async Task<IActionResult> RestoreSession()
        {
			var hasAuthToken = Request.Headers.TryGetValue("Authorization", out StringValues token);
			var secret = _configuration.GetValue<string>("Security:Secret");
			if (!hasAuthToken)
            {
                return BadRequest();
            }

            var res = await _userService.Authenticate(token, secret);
			return Ok(res);
        }

		[HttpGet("get-qr-key")]
		public IActionResult GetQrKey()
        {
			var userId = Guid.Parse(HttpContext.Items["uid"].ToString());
			var qrCode = _cryptoHelper.GenerateMfaKey(userId);
			return Ok(new { MfaKey = qrCode[1], Base64QrImageString = qrCode[0] });
        }
		[HttpGet("validate-pin")]
		public IActionResult ValidatePIN(string pin, string mfaKey)
        {
			var result = _cryptoHelper.ValidateMfaPIN(mfaKey, pin);
			return Ok(new { Result = result });
		}
	}
}
