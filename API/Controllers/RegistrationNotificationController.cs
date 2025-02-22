using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.Models;
using API.Services.Notification;
using Microsoft.AspNetCore.Mvc;
using Twilio.Rest.Chat.V1;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationNotificationController : ControllerBase
    {
        private readonly IRegistrationNotificationService _registrationNotificationService;
        public RegistrationNotificationController(IRegistrationNotificationService registrationNotificationService)
        {
            _registrationNotificationService = registrationNotificationService;

        }

        [HttpGet]
        [Route("getRegistrationNotification/{vehicleId}")]
        public async Task<ActionResult<GetRegistrationNotificationDto>> GetRegistrationNotification([FromRoute] int vehicleId)
        {
            var response = await _registrationNotificationService.GetRegistrationNotification(vehicleId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }
    }
}