using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataMigration.Migrations
{
    public partial class AvatarLinkChangeToGuid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarLink",
                table: "Users");

            migrationBuilder.AddColumn<Guid>(
                name: "AvatarImageId",
                table: "Users",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarImageId",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "AvatarLink",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
