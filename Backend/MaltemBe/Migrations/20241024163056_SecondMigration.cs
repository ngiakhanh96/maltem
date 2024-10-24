using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MaltemBe.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Cafes_CafeId",
                table: "Employees");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Cafes_CafeId",
                table: "Employees",
                column: "CafeId",
                principalTable: "Cafes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Cafes_CafeId",
                table: "Employees");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Cafes_CafeId",
                table: "Employees",
                column: "CafeId",
                principalTable: "Cafes",
                principalColumn: "Id");
        }
    }
}
