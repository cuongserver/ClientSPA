using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Security;

namespace DataMigration.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValue: "newid()"),
                    UserName = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    MfaEnabled = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
            var pepper = "e9ghp6";
            var superuser = "superuser";
            var initialPassword = "1234";
            var enhancer = new SecretEnhancer();
            var sql = $"insert into Users(Id, UserName, PasswordHash, MfaEnabled) values (newid(), '{superuser}', '{enhancer.GenerateHashedPassword(initialPassword, superuser, pepper)}', 1)";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
