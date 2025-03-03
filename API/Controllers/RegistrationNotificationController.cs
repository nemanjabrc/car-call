using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Notification;
using API.Models;
using API.Services.Notification;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "Owner")]
        [HttpGet]
        [Route("getRegistrationNotification/{vehicleId}")]
        public async Task<ActionResult<GetRegistrationNotificationDto>> GetRegistrationNotification([FromRoute] int vehicleId)
        {
            var response = await _registrationNotificationService.GetRegistrationNotification(vehicleId);

            if (!response.Success)
            {
                return NotFound(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("changeRegistrationNotificationMessage")]
        public async Task<ActionResult<GetCompanyRegistrationNotificationDto>> ChangeRegistrationNotificationMessage([FromBody] UpdateRegistrationNotificationDto updatedRegistrationNotification)
        {
            var response = await _registrationNotificationService.ChangeRegistrationNotificationMessage(updatedRegistrationNotification);

            if (!response.Success)
            {
                return NotFound(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("getCompanyRegistrationNotification/{companyId}")]
        public async Task<ActionResult<GetCompanyRegistrationNotificationDto>> GetCompanyRegistrationNotification([FromRoute] int companyId)
        {
            var response = await _registrationNotificationService.GetCompanyRegistrationNotification(companyId);

            if (!response.Success)
            {
                return NotFound(response.Message);
            }

            return Ok(response.Data);
        }
    }
}