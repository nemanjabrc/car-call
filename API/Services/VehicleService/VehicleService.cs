using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Vehicle;
using API.Services.UserContextService;
using Org.BouncyCastle.Bcpg;

namespace API.Services.VehicleService
{
    public class VehicleService : IVehicleService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUserHttpContextService _userHttpContextService;

        public VehicleService(IMapper mapper, DataContext context, IUserHttpContextService userHttpContextService)
        {
            _context = context;
            _userHttpContextService = userHttpContextService;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetVehicleDto>>> AddVehicle(AddVehicleDto newVehicle)
        {
            var response = new ServiceResponse<List<GetVehicleDto>>();
            int userId = _userHttpContextService.GetUserId();
            var vehicle = _mapper.Map<Vehicle>(newVehicle);

            var owner = await _context.Owners.FirstOrDefaultAsync(o => o.User!.Id == userId);
            if (owner is not null)
            {
                vehicle.Owner = owner;
            }
            else
            {
                response.Success = false;
                response.Message = "Vlasnik nije pronadjen.";
                return response;
            }

            vehicle.DateOfExpiration = vehicle.DateOfRegistration.AddYears(1);
            DateTime today = DateTime.Now.Date;

            int differenceInDays = (vehicle.DateOfExpiration.Date - today).Days;
            vehicle.IsRegistered = !(differenceInDays <= 30);


            try
            {
                int companyId = _userHttpContextService.GetUserCompanyId();
                var company = await _context.Companies
                    .Include(c => c.RegistrationNotification)
                    .FirstOrDefaultAsync(c => c.Id == companyId);
                vehicle.RegistrationNotification = company!.RegistrationNotification;
                Console.WriteLine("PORUKAAAA: " + company!.RegistrationNotification!.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("OVO JE GREŠKA:" + e.Message);
                vehicle.RegistrationNotification = new RegistrationNotification
                {
                    Message = $""" 
                    Redovna registracija ne samo da osigurava Vašu bezbijednost na putu, već i 
                    pomaže u izbjegavanju potencijalnih kazni. Molimo Vas da preduzmete potrebne
                    korake kako biste na vrijeme obnovili registraciju.
                    Hvala što brinete o sigurnosti na putu!
                    """
                };
            }

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            response.Data = await _context.Vehicles
                .Where(v => v.Owner!.Id == owner.Id).Select(v => _mapper
                .Map<GetVehicleDto>(v)).ToListAsync();
            response.Success = true;
            response.Message = "Uspješno ste dodali novo vozilo.";

            return response;
        }

        public Task<ServiceResponse<List<GetVehicleDto>>> AddVehicleToOWner(AddVehicleDto newVehicle)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<GetVehicleDto>>> DeleteVehicle(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<GetVehicleDto>>> GetOwnersVehicles(int ownerId)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<GetVehicleDto>> GetVehicle(int vehicleId)
        {
            //RADI, ALI ZBOG LOGIKE RAZMISLI DA LI OVAKO ILI MORA DA SE POPRAVI, NAPRAVI DODATNA METODA ILI STA VEC
            var response = new ServiceResponse<GetVehicleDto>();
            int userId = _userHttpContextService.GetUserId();
            try
            {
                var owner = await _context.Owners.FirstOrDefaultAsync(o => o.User!.Id == userId);
                if (owner is null)
                {
                    throw new Exception($"Vlasnik sa korisničkim id: {userId} ne postoji.");
                }
                var vehicle = await _context.Vehicles
                    .Include(v => v.RegistrationNotification)
                    .Include(v => v.MaintenanceNotifications)
                    .FirstOrDefaultAsync(v => v.Id == vehicleId && v.Owner!.Id == owner!.Id);

                response.Data = _mapper.Map<GetVehicleDto>(vehicle);
                response.Success = true;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }


            return response;
        }

        public Task<ServiceResponse<GetVehicleDto>> UpdateVehicle(UpdateVehicleDto updatedVehicle)
        {
            throw new NotImplementedException();
        }
    }
}