using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RestAPI.Models.Request;
using RestAPI.Models.Response;
using Service;
using Service.DTO.Output.Authentication;
using Security;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly IJwtTokenHelper _tokenHelper;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IConfiguration configuration, IJwtTokenHelper tokenHelper, IMapper mapper)
        {
            _userService = userService;
            _configuration = configuration;
            _tokenHelper = tokenHelper;
            _mapper = mapper;
        }

        [HttpPost("authenticate")]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody] UserLoginRequest credential)
        {
            var pepper = _configuration.GetValue<string>("Security:Pepper");
            var jwtSecret = _configuration.GetValue<string>("Security:JwtSecret");
            var jwtExpireAfter = _configuration.GetValue<int>("Security:JwtExpireAfter");
            var result = await _userService.Authenticate(credential.Password, credential.Username, pepper);
            var response = _mapper.Map<UserLoginResponse>(result);
            if (response.Result == AuthenticationResult.Success)
            {
                response.Token = _tokenHelper.GenerateJwtToken(response.UserDetail.Id, jwtSecret, jwtExpireAfter);
                return Ok(response);
            }
            return Ok(response);
        }
    }
}
