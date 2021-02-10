namespace DemoCms.EF.MsSqlServer.Seed
{
    using DemoCms.Domain.IdentityAndAccess;
    using DemoCms.Helper.Encryption;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;

    internal class Program
    {
        #region Methods

        internal static List<Permission> GetPermissions(Guid roleId)
        {
            var list = new List<Permission>();
            list.Add(new Permission { Id = Guid.NewGuid(), Category = typeof(RolesPermission).Name, Claim = RolesPermission.Create, RoleId = roleId });
            list.Add(new Permission { Id = Guid.NewGuid(), Category = typeof(RolesPermission).Name, Claim = RolesPermission.Edit, RoleId = roleId });
            list.Add(new Permission { Id = Guid.NewGuid(), Category = typeof(RolesPermission).Name, Claim = RolesPermission.List, RoleId = roleId });
            list.Add(new Permission { Id = Guid.NewGuid(), Category = typeof(RolesPermission).Name, Claim = RolesPermission.Delete, RoleId = roleId });
            list.Add(new Permission { Id = Guid.NewGuid(), Category = typeof(UsersPermission).Name, Claim = UsersPermission.Create, RoleId = roleId });
            list.Add(new Permission { Id = Guid.NewGuid(), Category = typeof(UsersPermission).Name, Claim = UsersPermission.Edit, RoleId = roleId });
            list.Add(new Permission { Id = Guid.NewGuid(), Category = typeof(UsersPermission).Name, Claim = UsersPermission.List, RoleId = roleId });
            list.Add(new Permission { Id = Guid.NewGuid(), Category = typeof(UsersPermission).Name, Claim = UsersPermission.Delete, RoleId = roleId });
            return list;
        }

        internal static void Main(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MsSqlServerDb>();
            var loginName = "superuser";
            var displayName = "Super User";
            var password = "1234";
            var cryptoHelper = new CryptoHelper();
            var salt = cryptoHelper.GenerateSalt(loginName);
            builder.UseSqlServer(@"Data Source=(LocalDb)\MSSQLLocalDB;Initial Catalog=DemoCms;");
            using (var ctx = new MsSqlServerDb(builder.Options))
            {
                ctx.Database.ExecuteSqlRaw("delete from Users");

                var userId = Guid.NewGuid();
                ctx.Users.Add(new User
                {
                    Id = userId,
                    LoginName = loginName,
                    DisplayName = displayName,
                    PasswordHash = cryptoHelper.GenerateHashedPassword(password, salt),
                    Salt = salt
                });


                var roleId = Guid.NewGuid();
                ctx.Database.ExecuteSqlRaw("delete from Roles");
                ctx.Roles.Add(new Role
                {
                    Id = roleId,
                    Name = "Admin",
                });

                var roleAssignmentId = Guid.NewGuid();
                ctx.Database.ExecuteSqlRaw("delete from RoleAssignments");
                ctx.RoleAssignments.Add(new RoleAssignment
                {
                    Id = roleAssignmentId,
                    UserId = userId,
                    RoleId = roleId
                });

                var claims = GetPermissions(roleId);
                ctx.Database.ExecuteSqlRaw("delete from Permissions");
                ctx.Permissions.AddRange(claims);



                ctx.SaveChanges();
            }
        }

        #endregion
    }
}
