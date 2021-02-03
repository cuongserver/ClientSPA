using DemoCms.Domain.IdentityAndAccess;
using DemoCms.Helper.Encryption;
using Microsoft.EntityFrameworkCore;
using System;

namespace DemoCms.EF.MsSqlServer.Seed
{
	class Program
	{
		static void Main(string[] args)
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
				ctx.Users.Add(new User
				{
					Id = Guid.NewGuid(),
					LoginName = loginName,
					DisplayName = displayName,
					PasswordHash = cryptoHelper.GenerateHashedPassword(password, salt),
					Salt = salt
				});
				ctx.SaveChanges();
			}

		}
	}
}
