using System;

namespace DataStorage
{
    public class User
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public bool MfaEnabled { get; set; }
    }
}
