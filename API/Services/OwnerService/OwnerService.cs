using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.OwnerService
{
    public class OwnerService : IOwnerService
    {
        private readonly IMapper _mapper;

        public OwnerService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public Task<ServiceResponse<List<GetOwnerDto>>> DeleteOwner(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetOwnerDto>> GetOwner(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<GetOwnerDto>>> GetOwnersFromCompany()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetOwnerDto>> UpdateOwner(UpdateOwnerDto updatedOwner)
        {
            throw new NotImplementedException();
        }
    }
}