using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCompaniesAndNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RegistrationNotifications_CompanyId",
                table: "RegistrationNotifications");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationNotifications_CompanyId",
                table: "RegistrationNotifications",
                column: "CompanyId",
                unique: true,
                filter: "[CompanyId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RegistrationNotifications_CompanyId",
                table: "RegistrationNotifications");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationNotifications_CompanyId",
                table: "RegistrationNotifications",
                column: "CompanyId");
        }
    }
}
