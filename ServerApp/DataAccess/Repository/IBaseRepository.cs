using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DatabaseContext;
using DataStorage;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository
{
    public interface IBaseRepository<T, TId> where TId : struct where T : class, IEntityId<TId>
    {
        public virtual Task<T> FindFirst(CmsContext ctx, Expression<Func<T, bool>> predicate)
        {
            return ctx.Set<T>().Where(predicate).FirstOrDefaultAsync();
        }
        public virtual Task<List<T>> FindAll(CmsContext ctx, Expression<Func<T, bool>> predicate)
        {
            return ctx.Set<T>().Where(predicate).ToListAsync();
        }
    }
}
