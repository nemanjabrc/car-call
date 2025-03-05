using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class FirebaseToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public int OwnerId { get; set; }
        public Owner Owner { get; set; }
    }
}