using DataStorage;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DataAccess.Repository
{
    public interface IUserRepository : IBaseRepository<User, Guid>
    {
        public virtual Task<int> AddNew(User user)
        {
            Context.Users.Add(user);
            return Context.SaveChangesAsync();
        }
        public virtual Task<int> UpdateAvatar(Guid imageId, Guid userId)
        {
            var user = Context.Users.FirstOrDefault(user => user.Id == userId);
            if (user != null)
            {
                user.AvatarImageId = imageId;
                return Context.SaveChangesAsync();
            }
            else
            {
                throw new Exception();
            }
        }
    }
}
