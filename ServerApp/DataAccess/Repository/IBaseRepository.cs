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
        public CmsContext Context { get; }
        public virtual Task<T> FindFirst(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().Where(predicate).FirstOrDefaultAsync();
        }
        public virtual Task<List<T>> FindAll(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().Where(predicate).ToListAsync();
        }
    }
}
