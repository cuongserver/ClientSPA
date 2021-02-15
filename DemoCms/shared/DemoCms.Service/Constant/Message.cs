using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCms.Service.Constant
{
    public static class AuthMessage
    {
        public const string AuthSuccess = "auth-success";
        public const string AuthFailed = "auth-failed";
    }

    public static class RoleCreateOrEditMessage
    {
        public const string RoleCreateSuccess = "role-create-success";
        public const string RoleNameExist = "role-create-duplicate-name";
    }
}
