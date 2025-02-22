using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Vehicle;
using API.Models;
using API.Services.Vehicle;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;
        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;

        }

        [HttpGet("getVehicle/{id}")]
        public async Task<ActionResult<GetVehicleDto>> GetVehicle([FromRoute] int id)
        {
            var response = await _vehicleService.GetVehicle(id);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("getVehicles")]
        public async Task<ActionResult<List<GetVehicleDto>>> GetVehicles()
        {
            var response = await _vehicleService.GetVehicles();

            if (!response.Success)
            {
                return BadRequest();
            }

            return Ok(response.Data);
        }

        [HttpGet("getAllVehiclesFromCompany/{companyId}")]
        public async Task<ActionResult<List<GetVehicleDto>>> GetAllVehiclesFromCompany([FromRoute] int companyId)
        {
            var response = await _vehicleService.GetAllVehiclesFromCompany(companyId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Owner")]
        [HttpPost("addVehicle")]
        public async Task<ActionResult<GetVehicleDto>> AddVehicle(AddVehicleDto newVehicle)
        {
            var response = await _vehicleService.AddVehicle(newVehicle);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Owner")]
        [HttpPut("renewRegistration/{vehicleId}")]
        public async Task<ActionResult<GetVehicleDto>> RenewRegistration([FromRoute] int vehicleId)
        {
            var response = await _vehicleService.RenewRegistration(vehicleId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [HttpDelete("deleteVehicle/{vehicleId}")]
        public async Task<ActionResult<int>> DeleteVehicle(int vehicleId)
        {
            var response = await _vehicleService.DeleteVehicle(vehicleId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }
    }
}