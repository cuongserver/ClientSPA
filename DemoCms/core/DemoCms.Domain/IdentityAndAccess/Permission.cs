using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCms.Domain.IdentityAndAccess
{
    public static class PermissionCategory
    {
        public const string Roles = "Roles";
        public const string Users = "Users";
    }
    public static class RolesPermission
    {
        public const string Create = "RolesCreate";
        public const string List = "RolesList";
        public const string Edit = "RolesEdit";
        public const string Delete = "RolesDelete";
        public static List<string> All() => new List<string>() { Create, List, Edit, Delete };
    }
    public static class UsersPermission
    {
        public const string Create = "UsersCreate";
        public const string List = "UsersList";
        public const string Edit = "UsersEdit";
        public const string Delete = "UsersDelete";
        public static List<string> All() => new List<string>() { Create, List, Edit, Delete };

    }
    public class Role: ForAuditPurpose
    {
        public virtual Guid Id { get; set; }
        public virtual string  Name { get; set; }
    }

    public class Permission: ForAuditPurpose
    {
        public virtual Guid Id { get; set; }
        public virtual string Category { get; set; }
        public virtual string Claim { get; set; }
        public virtual Guid RoleId { get; set; }
    }
    public class RoleAssignment: ForAuditPurpose
    {
        public virtual Guid Id { get; set; }
        public virtual Guid UserId { get; set; }
        public virtual Guid RoleId { get; set; }
    }
}
