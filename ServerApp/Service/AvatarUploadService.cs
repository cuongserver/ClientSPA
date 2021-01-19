using DataAccess.DatabaseContext;
using DataStorage;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class AvatarUploadService : IAvatarUploadService
    {
        private readonly CmsContext _ctx;
        private readonly IUserService _userService;
        private readonly IAvatarImageService _avatarImageService;
        private readonly IAvatarImageStorageService _avatarImageStorageService;
        public AvatarUploadService(
            CmsContext ctx,
            IUserService userService,
            IAvatarImageService avatarImageService,
            IAvatarImageStorageService avatarImageStorageService
            )
        {
            _ctx = ctx;
            _userService = userService;
            _avatarImageService = avatarImageService;
            _avatarImageStorageService = avatarImageStorageService;
        }

        public async Task<Guid> UploadImage(IFormFile file, Guid imageId, string fileName, Guid userId)
        {
            using (var transaction = _ctx.Database.BeginTransaction())
            {
                await _userService.UpdateAvatar(imageId, userId);
                var path = await _avatarImageStorageService.SaveImage(file, imageId, fileName);
                var avatarImage = new AvatarImage
                {
                    Id = imageId,
                    Path = path
                };
                await _avatarImageService.AddAvatar(avatarImage);
                _ctx.Database.CommitTransaction();
                return imageId;
            }
        }
    }
}
