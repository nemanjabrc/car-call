using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.FirebaseToken;
using API.Services.FirebaseToken;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FirebaseTokenController : ControllerBase
    {
        private readonly IFirebaseTokenService _firebaseTokenService;
        public FirebaseTokenController(IFirebaseTokenService firebaseTokenService)
        {
            _firebaseTokenService = firebaseTokenService;

        }

        [HttpPost]
        [Route("addFirebaseTokenToOwner")]
        public async Task<ActionResult<string>> AddFirebaseTokenToOwner([FromBody] AddFirebaseTokenDto newToken)
        {
            var response = await _firebaseTokenService.AddFirebaseTokenToOwner(newToken.OwnerId, newToken.Token);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Data);
        }
    }
}