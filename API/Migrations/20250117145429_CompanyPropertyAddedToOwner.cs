using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class CompanyPropertyAddedToOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Owners",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Owners_CompanyId",
                table: "Owners",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Owners_Companies_CompanyId",
                table: "Owners",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Owners_Companies_CompanyId",
                table: "Owners");

            migrationBuilder.DropIndex(
                name: "IX_Owners_CompanyId",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Owners");
        }
    }
}
