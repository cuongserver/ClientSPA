using DataStorage;
using System;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public interface IAvatarImageRepository : IBaseRepository<AvatarImage, Guid>
    {
        public virtual Task<int> AddNew(AvatarImage avatarImage)
        {
            Context.AvatarImages.Add(avatarImage);
            return Context.SaveChangesAsync();
        }
    }
}
