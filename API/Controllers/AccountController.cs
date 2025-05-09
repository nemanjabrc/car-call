using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Owner;
using API.DTOs.User;
using API.DTOs.Password;
using API.Models;
using API.Services.Account;
using API.Services.Token;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly TokenService _tokenService;
        public AccountController(IAccountService accountService, UserManager<User> userManager, IMapper mapper, TokenService tokenService)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _userManager = userManager;
            _accountService = accountService;

        }

        [HttpPost("login")]
        public async Task<ActionResult<GetUserDto>> Login(LoginUserDto loginUser)
        {
            var response = await _accountService.Login(loginUser);

            if (!response.Success)
            {
                return Unauthorized(new { message = response.Message });
            }

            return Ok(response.Data);
        }

        [Authorize]
        [HttpPut("changePassword")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return NotFound("Korisnik nije pronađen.");

            var response = await _accountService.ChangePassword(user, model.OldPassword, model.NewPassword);

            if (!response.Success)
            {
                if (response.Message.Contains("Problem sa promjenom lozinke"))
                {
                    foreach (var error in response.Data.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return ValidationProblem();
                }
            }

            return Ok(response.Data);
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto model)
        {
            var response = await _accountService.ForgotPassword(model.Email);

            if (!response.Success)
            {
                return BadRequest(new { message = response.Message });
            }

            return Ok(new { message = response.Message });
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            var response = await _accountService.ResetPassword(model.Email, model.Token, model.NewPassword);

            if (!response.Success)
            {
                return BadRequest(new { message = response.Message, errors = response.Data });
            }

            return Ok(new { message = response.Message });
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterOwnerDto registerOwner)
        {
            var response = await _accountService.Register(
            new Owner
            {
                Name = registerOwner.Name,
                Surname = registerOwner.Surname,
                Email = registerOwner.Email,
                PhoneNumber = registerOwner.PhoneNumber,
                NotificationService = registerOwner.NotificationService,
            },
                registerOwner.Username,
                registerOwner.Password
            );

            if (!response.Success)
            {
                if (response.Message.Contains("Problem sa validacijom"))
                {
                    foreach (var error in response.Data.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("registerAdmin")]
        public async Task<ActionResult> RegisterAdmin(RegisterAdminDto registerAdmin)
        {
            var response = await _accountService.RegisterAdmin(
                new User
                {
                    Name = registerAdmin.Name,
                    Surname = registerAdmin.Surname,
                    Email = registerAdmin.Email,
                },
                registerAdmin.CompanyId
            );

            if (!response.Success)
            {
                if (response.Message.Contains("Problem sa validacijom"))
                {
                    foreach (var error in response.Data.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("registerOperator")]
        public async Task<ActionResult> RegisterOperator(RegisterOperatorDto registerOperator)
        {
            var response = await _accountService.RegisterOperator(
                new User
                {
                    Name = registerOperator.Name,
                    Surname = registerOperator.Surname,
                    Email = registerOperator.Email
                }
            );


            if (!response.Success)
            {
                if (response.Message.Contains("Problem sa validacijom"))
                {
                    foreach (var error in response.Data.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin,Operator")]
        [HttpPost("registerOwner")]
        public async Task<ActionResult> RegisterOwner(RegisterUserOwnerDto registerOwner)
        {
            var response = await _accountService.RegisterOwner(
                new Owner
                {
                    Name = registerOwner.Name,
                    Surname = registerOwner.Surname,
                    Email = registerOwner.Email,
                    PhoneNumber = registerOwner.PhoneNumber,
                    NotificationService = registerOwner.NotificationService
                }
            );

            if (!response.Success)
            {
                if (response.Message.Contains("Problem sa validacijom"))
                {
                    foreach (var error in response.Data.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getAllOperatorsFromCompany/{companyId}")]
        public async Task<ActionResult<List<GetOperatorProfileDto>>> GetAllOperatorsFromCompany([FromRoute] int companyId, string searchTerm)
        {
            var response = await _accountService.GetAllOperatorsFromCompany(companyId, searchTerm);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getOperatorProfile/{operatorId}")]
        public async Task<ActionResult<GetOperatorProfileDto>> GetOperatorProfile([FromRoute] string operatorId)
        {
            var response = await _accountService.GetOperatorProfile(operatorId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteOperator/{operatorId}")]
        public async Task<ActionResult> DeleteOperator([FromRoute] string operatorId)
        {
            var response = await _accountService.DeleteOperator(operatorId);

            if (!response.Success)
            {
                if (response.Message.Contains("Greška prilikom brisanja"))
                {
                    foreach (var error in response.Data.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }
                else
                {
                    return BadRequest(response.Message);
                }
            }

            return Ok(response.Data.Succeeded);
        }

        [Authorize(Roles = "Admin,Operator,Owner")]
        [HttpDelete("deleteOwner/{ownerId}")]
        public async Task<ActionResult> DeleteOwner([FromRoute] int ownerId)
        {
            var response = await _accountService.DeleteOwner(ownerId);

            if (!response.Success)
            {
                if (response.Message.Contains("Greška prilikom brisanja korisničkog naloga"))
                {
                    foreach (var error in response.Data.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }
                else
                {
                    return BadRequest(response.Message);
                }
            }

            return Ok(response.Data.Succeeded);
        }

        [Authorize(Roles = "Admin,Operator")]
        [HttpGet("getAllOwnersFromCompany/{companyId}")]
        public async Task<ActionResult<List<GetOwnerDto>>> GetAllOwnersFromCompany([FromRoute] int companyId, string searchTerm)
        {
            var response = await _accountService.GetAllOwnersFromCompany(companyId, searchTerm);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin,Operator")]
        [HttpGet("getOwnerFromCompany/{ownerId}")]
        public async Task<ActionResult<GetOwnerDto>> GetOwnerFromCompany([FromRoute] int ownerId)
        {
            var response = await _accountService.GetOwnerFromCompany(ownerId);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<GetUserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var userDto = _mapper.Map<GetUserDto>(user);
            userDto.Token = await _tokenService.GenerateToken(user);

            return Ok(userDto);
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("getCurrentOwnerProfile")]
        public async Task<ActionResult<GetOwnerProfileDto>> GetCurrentOwnerProfile()
        {
            var response = await _accountService.GetCurrentOwnerProfile();

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("getSuperadminProfile")]
        public async Task<ActionResult<GetSuperadminProfileDto>> GetSuperadminProfile()
        {
            var response = await _accountService.GetSuperadminProfile();

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getCurrentAdminProfile")]
        public async Task<ActionResult<GetAdminProfileDto>> GetCurrentAdminProfile()
        {
            var response = await _accountService.GetCurrentAdminProfile();

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }

        [Authorize(Roles = "Operator")]
        [HttpGet("getCurrentOperatorProfile")]
        public async Task<ActionResult<GetOperatorProfileDto>> GetCurrentOperatorProfile()
        {
            var response = await _accountService.GetCurrentOperatorProfile();

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }
    }
}