using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Company;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services.CompanyService
{
    public class CompanyService : ICompanyService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public CompanyService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;

        }
        public async Task<ServiceResponse<List<GetCompanyDto>>> AddCompany(AddCompanyDto newCompany)
        {
            var response = new ServiceResponse<List<GetCompanyDto>>();
            var company = _mapper.Map<Models.Company>(newCompany);
            var newNotification = new RegistrationNotification(company);
            company.RegistrationNotification = newNotification;

            _context.RegistrationNotifications.Add(newNotification);
            _context.Companies.Add(company);
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                response.Data = await _context.Companies
                .Select(c => _mapper.Map<GetCompanyDto>(c))
                .ToListAsync();

                response.Success = true;
            }

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
                    throw new Exception($"Kompanija sa id: {id} nije pronadjena.");
                }

                _context.Companies.Remove(company);
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    response.Data = await _context.Companies
                        .Select(c => _mapper.Map<GetCompanyDto>(c))
                        .ToListAsync();
                    response.Success = true;
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetCompanyDto>>> GetAllCompanies()
        {
            var response = new ServiceResponse<List<GetCompanyDto>>();
            var companies = await _context.Companies
                .Select(c => _mapper.Map<GetCompanyDto>(c))
                .ToListAsync();

            response.Data = companies;
            response.Success = true;

            return response;
        }

        public async Task<ServiceResponse<GetCompanyDto>> GetCompanyById(int id)
        {
            var response = new ServiceResponse<GetCompanyDto>();
            var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == id);

            if (company == null)
            {
                response.Success = false;
                response.Message = $"Kompanija sa id: {id} nije pronadjena.";
                return response;
            }

            response.Data = _mapper.Map<GetCompanyDto>(company);
            response.Success = true;

            return response;
        }

        public async Task<ServiceResponse<GetCompanyDto>> UpdateCompany(UpdateCompanyDto updatedCompany)
        {
            var response = new ServiceResponse<GetCompanyDto>();

            try
            {
                var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == updatedCompany.Id);
                if (company is null)
                {
                    throw new Exception($"Kompanija sa id: {updatedCompany.Id} nije pronadjena.");
                }

                company.Name = updatedCompany.Name;
                company.Address = updatedCompany.Address;
                company.City = updatedCompany.City;
                company.PhoneNumber = updatedCompany.PhoneNumber;
                company.Email = updatedCompany.Email;

                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    response.Data = _mapper.Map<GetCompanyDto>(company);
                    response.Success = true;
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;

        }
    }
}