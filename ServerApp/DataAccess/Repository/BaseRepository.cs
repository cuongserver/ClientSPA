using DataAccess.DatabaseContext;
using DataStorage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository
{
    public abstract class BaseRepository<T, TId> where TId : struct where T : class, IEntityId<TId>
    {
        public CmsContext Context { get; protected set; }
        public async virtual Task<T> FindById(TId id)
        {
            return await Context.Set<T>().FindAsync(id);
        }
    }
}
