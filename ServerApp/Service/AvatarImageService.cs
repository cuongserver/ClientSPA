using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Repository;
using DataStorage;

namespace Service
{
    public class AvatarImageService : IAvatarImageService
    {
        private readonly IAvatarImageRepository _avatarImageRepo;
        public AvatarImageService(IAvatarImageRepository avatarImageRepo)
        {
            _avatarImageRepo = avatarImageRepo;
        }

        public async Task<int> AddAvatar(AvatarImage avatarImage)
        {
            return await _avatarImageRepo.AddNew(avatarImage);
        }
    }
}
