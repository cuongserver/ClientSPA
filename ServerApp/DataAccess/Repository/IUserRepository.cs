﻿using DataStorage;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public interface IUserRepository<T, TId> : IBaseRepository<T, TId> where TId : struct where T : class, IEntityId<TId>
    {


    }
}