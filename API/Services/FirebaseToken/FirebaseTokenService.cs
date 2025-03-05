using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services.FirebaseToken
{
    public class FirebaseTokenService : IFirebaseTokenService
    {
        private readonly DataContext _context;
        public FirebaseTokenService(DataContext context)
        {
            _context = context;

        }
        public async Task<ServiceResponse<string>> AddFirebaseTokenToOwner(int ownerId, string token)
        {
            var response = new ServiceResponse<string>();

            var owner = await _context.Owners
                .Include(o => o.FirebaseTokens)
                .FirstOrDefaultAsync(o => o.Id == ownerId);
            if (owner is null)
            {
                response.Success = false;
                response.Message = $"Nije pronadje vlasnik sa id: {ownerId} u bazi.";
                return response;
            }

            var firebaseToken = new Models.FirebaseToken
            {
                Token = token,
                OwnerId = ownerId,
                Owner = owner,
            };

            _context.FirebaseTokens.Add(firebaseToken);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                response.Success = false;
                response.Message = "greška prilikom dodavanja firebase tokena za vlasnika.";
                return response;
            }

            response.Data = token;
            response.Success = true;

            return response;
        }
    }
}