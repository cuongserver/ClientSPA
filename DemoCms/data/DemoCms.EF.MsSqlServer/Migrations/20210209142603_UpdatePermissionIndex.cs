using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoCms.EF.MsSqlServer.Migrations
{
    public partial class UpdatePermissionIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Claim",
                table: "Permissions",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_Claim",
                table: "Permissions",
                column: "Claim");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Permissions_Claim",
                table: "Permissions");

            migrationBuilder.AlterColumn<string>(
                name: "Claim",
                table: "Permissions",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
