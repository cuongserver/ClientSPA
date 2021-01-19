using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RestAPI.Models.Request;
using RestAPI.Models.Response;
using Security;
using Service;
using Service.DTO.Output.Authentication;
using System;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Linq;

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
        private readonly IAvatarImageStorageService _avatarStorageService;
        private readonly IAvatarUploadService _avatarUploadService;
        public UserController(
            IUserService userService,
            IConfiguration configuration,
            IJwtTokenHelper tokenHelper,
            IMapper mapper,
            IAvatarImageStorageService avatarStorageService,
            IAvatarUploadService avatarUploadService
            )
        {
            _userService = userService;
            _configuration = configuration;
            _tokenHelper = tokenHelper;
            _mapper = mapper;
            _avatarStorageService = avatarStorageService;
            _avatarUploadService = avatarUploadService;
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
        [HttpPost("add-member")]
        [AllowAnonymous]
        public async Task<IActionResult> AddMember([FromBody] AddMemberRequest user)
        {
            var pepper = _configuration.GetValue<string>("Security:Pepper");
            var result = await _userService.AddNewMember(user, pepper);
            return Ok(result);
        }

        [HttpPost("submit-avatar")]
        public async Task<IActionResult> SubmitAvatar(IFormFile avatarImage)
        {
            var userId = Guid.Parse(HttpContext.Items["uid"].ToString());
            var fileName = ContentDispositionHeaderValue.Parse(avatarImage.ContentDisposition).FileName.Trim('"');
            //await _avatarStorageService.SaveImage(avatarImage, Guid.NewGuid(), fileName);
            var res = await _avatarUploadService.UploadImage(avatarImage, Guid.NewGuid(), fileName, userId);
            return Ok(res);
        }
    }
}
