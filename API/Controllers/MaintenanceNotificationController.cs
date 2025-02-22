using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.Services.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaintenanceNotificationController : ControllerBase
    {
        private readonly IMaintenanceNotificationService _maintenanceNotificationService;
        public MaintenanceNotificationController(IMaintenanceNotificationService maintenanceNotificationService)
        {
            _maintenanceNotificationService = maintenanceNotificationService;

        }

        [HttpGet]
        [Route("getAllVehicleMaintenanceNotifications/{vehicleId}")]
        public async Task<ActionResult<List<GetMaintenanceNotificationDto>>> GetAllVehicleMaintenanceNotifications([FromRoute] int vehicleId)
        {
            var response = await _maintenanceNotificationService.GetAllVehicleMaintenanceNotifications(vehicleId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("getSingleVehicleMaintenanceNotification/{notificationId}")]
        public async Task<ActionResult<GetMaintenanceNotificationDto>> GetSingleVehicleMaintenanceNotification([FromRoute] int notificationId)
        {
            var response = await _maintenanceNotificationService.GetSingleVehicleMaintenanceNotification(notificationId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Owner")]
        [HttpPost]
        [Route("addMaintenanceNotification/{vehicleId}")]
        public async Task<ActionResult<GetMaintenanceNotificationDto>> AddMaintenanceNotification([FromRoute] int vehicleId, [FromBody] AddMaintenanceNotificationDto newMaintenanceNotification)
        {
            var response = await _maintenanceNotificationService.AddMaintenanceNotification(vehicleId, newMaintenanceNotification);
            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [HttpDelete]
        [Route("deleteMaintenanceNotification/{notificationId}")]
        public async Task<ActionResult<int>> DeleteMaintenanceNotification([FromRoute] int notificationId)
        {
            var response = await _maintenanceNotificationService.DeleteMaintenanceNotification(notificationId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }
    }
}