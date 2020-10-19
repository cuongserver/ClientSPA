using DataAccess.DatabaseContext;
using DataStorage;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;


namespace DataAccess.Repository
{
    public abstract class BaseRepository<T, TId> where TId : struct where T : class, IEntityId<TId>
    {
        private readonly CmsContext _ctx;
        public BaseRepository(CmsContext ctx)
        {
            _ctx = ctx;
        }

        public virtual Task<T> FindFirst(Expression<Func<T, bool>> predicate)
        {
            return _ctx.Set<T>().Where(predicate).FirstOrDefaultAsync();
        }
        public virtual Task<List<T>> FindAll(Expression<Func<T, bool>> predicate)
        {
            return _ctx.Set<T>().Where(predicate).ToListAsync();
        }
    }
}
