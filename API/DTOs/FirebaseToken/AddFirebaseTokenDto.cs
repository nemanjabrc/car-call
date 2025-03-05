using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.FirebaseToken
{
    public class AddFirebaseTokenDto
    {
        public int OwnerId { get; set; }
        public string Token { get; set; }
    }
}