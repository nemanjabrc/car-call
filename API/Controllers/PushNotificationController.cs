using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Firebase;
using Microsoft.AspNetCore.Mvc;

//*************************************************
//KONTROLER ZA TESTIRANJE SLANJA PUSH NOTIFIKACIJA
//*************************************************

namespace API.Controllers
{
    public class PushNotificationController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;

        public PushNotificationController()
        {
            _firebaseService = new FirebaseService();
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationRequest request)
        {
            var token = request.Token;

            await _firebaseService.SendPushNotification(token, request.Title, request.Body);

            return Ok("Notifikacija uspješno poslata.");
        }
    }

    public class NotificationRequest
    {
        public string Token { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
    }
}