using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Company;
using API.DTOs.Owner;
using API.DTOs.Vehicle;

namespace API
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Owner, GetOwnerDto>();
            CreateMap<AddCompanyDto, Company>();
            CreateMap<Company, GetCompanyDto>();
            CreateMap<Vehicle, GetVehicleDto>();
            CreateMap<AddVehicleDto, Vehicle>();
        }
    }
}