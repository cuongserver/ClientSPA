using System;

namespace DemoCms.Domain
{
    public abstract class ForAuditPurpose
    {
        public virtual Guid CreatedByUserId { get; set; }
        public virtual DateTime CreatedAtTime { get; set; }
        public virtual Guid LastUpdateByUserId { get; set; }
        public virtual DateTime LastUpdateAtTime { get; set; }
        public virtual bool IsDeleted { get; set; }
        public virtual int Version { get; set; }
    }
}
