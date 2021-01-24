using System;
using System.ComponentModel.DataAnnotations;

namespace DemoCms.Domain.IdentityAndAccess
{
    public class User : ForAuditPurpose
    {
        public virtual Guid Id { get; set; }
        public virtual string Email { get; set; }
        public virtual string LoginName { get; set; }
        public virtual string DisplayName { get; set; }
        public virtual string PasswordHash { get; set; }
        public virtual bool MfaEnabled { get; set; }
        public virtual string MfaKey { get; set; }
    }
}
