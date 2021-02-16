using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoCms.RestAPI.Caching
{
    public class PermissionCachingManager
    {
        private readonly ConcurrentDictionary<Guid, PermissionModelForCaching> _permissionCache;
        public PermissionCachingManager()
        {
            _permissionCache = new ConcurrentDictionary<Guid, PermissionModelForCaching>();
        }
        public PermissionModelForCaching GetValue(Guid id)
        {
            _permissionCache.TryGetValue(id, out PermissionModelForCaching value);
            return value;
        }
        public bool AddValue(PermissionModelForCaching cacheValue)
        {
            return _permissionCache.TryAdd(cacheValue.UserId, cacheValue);
        }
    }
}
