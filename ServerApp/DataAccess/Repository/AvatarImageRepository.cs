using DataAccess.DatabaseContext;
using DataStorage;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Repository
{
    public class AvatarImageRepository : IAvatarImageRepository
    {
        public CmsContext Context { get; }

        public AvatarImageRepository(CmsContext ctx)
        {
            Context = ctx;
        }
    }
}
