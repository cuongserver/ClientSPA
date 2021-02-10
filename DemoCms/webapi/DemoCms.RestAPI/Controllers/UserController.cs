﻿using DemoCms.RestAPI.Models;
using DemoCms.Service.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using System.Text;
using Newtonsoft.Json;
using Microsoft.Extensions.Primitives;

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
			var secret = _configuration.GetValue<string>("Security:Secret");
			var validPeriod = _configuration.GetValue<int>("Security:ValidPeriod");
			var res = await _userService.Authenticate(request.Password, request.LoginName, secret, validPeriod);
			return Ok(res);
		}

		[HttpGet("restore-session")]
		public async Task<IActionResult> RestoreSession()
        {
			var hasAuthToken = Request.Headers.TryGetValue("Authorization", out StringValues token);
			var secret = _configuration.GetValue<string>("Security:Secret");
			if (!hasAuthToken) return BadRequest();
			var res = await _userService.Authenticate(token, secret);
			return Ok(res);
        }

	}
}
