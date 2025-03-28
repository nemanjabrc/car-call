﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class SetVehicleAndMaintenanceNotificationsCascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceNotifications_Vehicles_VehicleId",
                table: "MaintenanceNotifications");

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceNotifications_Vehicles_VehicleId",
                table: "MaintenanceNotifications",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceNotifications_Vehicles_VehicleId",
                table: "MaintenanceNotifications");

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceNotifications_Vehicles_VehicleId",
                table: "MaintenanceNotifications",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id");
        }
    }
}
