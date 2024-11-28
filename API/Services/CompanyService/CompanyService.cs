using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Company;

namespace API.Services.CompanyService
{
    public class CompanyService : ICompanyService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CompanyService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse<List<GetCompanyDto>>> AddCompany(AddCompanyDto newCompany)
        {
            var response = new ServiceResponse<List<GetCompanyDto>>();
            var company = _mapper.Map<Company>(newCompany);

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            response.Data = await _context.Companies.Select(c => _mapper.Map<GetCompanyDto>(c)).ToListAsync();
            response.Success = true;
            response.Message = "Uspješno ste dodali novu kompaniju.";

            return response;
        }

        public async Task<ServiceResponse<List<GetCompanyDto>>> DeleteCompany(int id)
        {
            var response = new ServiceResponse<List<GetCompanyDto>>();
            try
            {
                var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == id);
                if (company is null)
                {
                    throw new Exception($"Kompanija sa id: `{id}` nije pronadjena.");
                }

                _context.Companies.Remove(company);
                await _context.SaveChangesAsync();

                response.Data = await _context.Companies.Select(c => _mapper.Map<GetCompanyDto>(c)).ToListAsync();
                response.Success = true;
                response.Message = "Uspješno ste obrisali kompaniju " + company.Name;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetCompanyDto>>> GetAllCompanies()
        {
            var response = new ServiceResponse<List<GetCompanyDto>>();
            var companies = await _context.Companies.Select(c => _mapper.Map<GetCompanyDto>(c)).ToListAsync();

            response.Data = companies;
            response.Success = true;

            return response;
        }

        public Task<ServiceResponse<GetCompanyDto>> GetCompanyById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<GetCompanyDto>> UpdateCompany(UpdateCompanyDto updatedCompany)
        {
            var response = new ServiceResponse<GetCompanyDto>();
            try
            {
                var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == updatedCompany.Id);
                if (company is null)
                {
                    throw new Exception($"Kompanija sa id: `{updatedCompany.Id}` nije pronadjena.");
                }

                company.Name = updatedCompany.Name;
                company.Address = updatedCompany.Address;
                company.City = updatedCompany.City;
                company.PhoneNumber = updatedCompany.PhoneNumber;
                company.Email = updatedCompany.Email;

                await _context.SaveChangesAsync();
                response.Data = _mapper.Map<GetCompanyDto>(company);
                response.Success = true;
                response.Message = "Uspješno ste ažurirali podatke kompanije " + updatedCompany.Name + ".";
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }

            return response;
        }
    }
}