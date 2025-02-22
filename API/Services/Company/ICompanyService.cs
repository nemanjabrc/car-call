using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Company;
using API.Models;

namespace API.Services.CompanyService
{
    public interface ICompanyService
    {
        Task<ServiceResponse<List<GetCompanyDto>>> GetAllCompanies();
        Task<ServiceResponse<GetCompanyDto>> GetCompanyById(int id);
        Task<ServiceResponse<List<GetCompanyDto>>> AddCompany(AddCompanyDto newCompany);
        Task<ServiceResponse<GetCompanyDto>> UpdateCompany(UpdateCompanyDto updatedCompany);
        Task<ServiceResponse<List<GetCompanyDto>>> DeleteCompany(int id);
    }
}