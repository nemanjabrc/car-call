using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class RegistrationNotificationsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RegistrationNotificationId",
                table: "Vehicles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegistrationNotificationId",
                table: "Companies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RegistrationNotifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationNotifications", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_RegistrationNotificationId",
                table: "Vehicles",
                column: "RegistrationNotificationId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_RegistrationNotificationId",
                table: "Companies",
                column: "RegistrationNotificationId",
                unique: true,
                filter: "[RegistrationNotificationId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_RegistrationNotifications_RegistrationNotificationId",
                table: "Companies",
                column: "RegistrationNotificationId",
                principalTable: "RegistrationNotifications",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_RegistrationNotifications_RegistrationNotificationId",
                table: "Vehicles",
                column: "RegistrationNotificationId",
                principalTable: "RegistrationNotifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_RegistrationNotifications_RegistrationNotificationId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_RegistrationNotifications_RegistrationNotificationId",
                table: "Vehicles");

            migrationBuilder.DropTable(
                name: "RegistrationNotifications");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_RegistrationNotificationId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Companies_RegistrationNotificationId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "RegistrationNotificationId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "RegistrationNotificationId",
                table: "Companies");
        }
    }
}
