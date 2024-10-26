using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MaltemBe.Migrations
{
    /// <inheritdoc />
    public partial class AddLogoForCafe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Logo",
                table: "Cafes",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Cafes");
        }
    }
}
