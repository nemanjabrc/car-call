using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.OwnerService
{
    public class OwnerService : IOwnerService
    {
        private static List<Owner> owners = new List<Owner> {
            new Owner {
                Id = 1,
                Name = "Nemanja",
                Surname="Nemanjic",
                Email = "nnemanjic@gmail.com",
                NotificationService = new List<NotificationServiceType> {NotificationServiceType.WhatsAppService},
                PhoneNumber = "089678564",
                User = new User {
                    Id = 1,
                    Name = "Nemanja",
                    Surname="Nemanjic",
                    Email = "nnemanjic@gmail.com",
                    Company = new Company{
                        Id = 1,
                        Name = "Bobar",
                        Address = "Marka Kraljevica 12",
                        Email = "drina123@gmail.com",
                        PhoneNumber = "980767555"
                    },
                    CreatedBy = UserTypeClass.OwnerType,
                    CreationDate = DateTime.Now,
                    Role = UserTypeClass.OwnerType,
                    Username = "nnemanja",
                },
            },
            new Owner {
                Id = 1,
                Name = "Marko",
                Surname="Markovic",
                Email = "mmarkovic@gmail.com",
                NotificationService = new List<NotificationServiceType> {NotificationServiceType.WhatsAppService, NotificationServiceType.SMSService},
                PhoneNumber = "089546123",
            },
            new Owner {
                Id = 1,
                Name = "Petar",
                Surname="Petrovic",
                Email = "ppetrovic@gmail.com",
                NotificationService = new List<NotificationServiceType> {NotificationServiceType.WhatsAppService, NotificationServiceType.SMSService, NotificationServiceType.EmailService},
                PhoneNumber = "089546123"
            },
        };
        private readonly IMapper _mapper;

        public OwnerService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Task<ServiceResponse<List<GetOwnerDto>>> DeleteOwner(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<GetOwnerDto>>> GetAllOwners()
        {
            var response = new ServiceResponse<List<GetOwnerDto>>();

            try
            {
                response.Data = owners.Select(o => _mapper.Map<GetOwnerDto>(o)).ToList();
                response.Success = true;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }

            return response;
        }

        public Task<ServiceResponse<GetOwnerDto>> GetOwnerById(int id)
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