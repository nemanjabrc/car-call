using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Admin;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(OwnerRegisterDto request)
        {
            var response = await _authRepository.Register(
                new Owner
                {
                    Name = request.Name,
                    Surname = request.Surname,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,
                    NotificationService = request.NotificationService,
                },
                request.Username,
                request.Password
            );

            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("RegisterAdmin")]
        public async Task<ActionResult<ServiceResponse<int>>> RegisterAdmin(UserAdminRegisterDto request)
        {
            var response = await _authRepository.RegisterAdmin(
                new User
                {
                    Name = request.Name,
                    Surname = request.Surname,
                    Email = request.Email,
                    Username = request.Username,
                },
                request.Password,
                request.CompanyId
            );

            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}