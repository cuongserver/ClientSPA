using System;
using System.Collections.Generic;
using System.Text;

namespace DataStorage
{
    public interface IEntityId<TId> where TId : struct
    {
        TId Id { get; set; }
    }
}
