using DataStorage;
using System.Threading.Tasks;

namespace Service
{
    public interface IAvatarImageService
    {
        Task<int> AddAvatar(AvatarImage avatarImage);
    }
}