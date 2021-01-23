using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DemoCms.Domain.IdentityAndAccess
{
    public class UserAvatarMetadata
    {
        [Key]
        public virtual Guid Id { get; set; }
        public virtual Guid UserId { get; set; }
        public virtual string Path { get; set; }
    }
}
