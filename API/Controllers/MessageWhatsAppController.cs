using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services.Twilio;
using Microsoft.AspNetCore.Mvc;

//**********************************************
//TESTNI ENDPOINT DA PROVJERIM DA LI RADI SERVIS
//**********************************************

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageWhatsAppController : ControllerBase
    {
        private readonly ITwilioService _twilioService;
        public MessageWhatsAppController(ITwilioService twilioService)
        {
            _twilioService = twilioService;

        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
        {
            await _twilioService.SendWhatsAppMessage(request.ToPhoneNumber, request.MessageBody);

            return Ok(new { Message = "Poruka poslata!" });
        }
    }

    public class SendMessageRequest
    {
        public string ToPhoneNumber { get; set; }
        public string MessageBody { get; set; }
    }
}