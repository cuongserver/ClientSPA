using Microsoft.EntityFrameworkCore.Migrations;
using System;
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
                    Id = table.Column<Guid>(nullable: false),
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
            migrationBuilder.InsertData(
                    table: "Users",
                    columns: new string[] { "Id", "UserName", "PasswordHash", "MfaEnabled" },
                    values: new object[] { Guid.NewGuid().ToString(), superuser, enhancer.GenerateHashedPassword(initialPassword, superuser, pepper), true }
                );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
