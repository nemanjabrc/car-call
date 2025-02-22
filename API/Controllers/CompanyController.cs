using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Threading.Tasks;
using API.DTOs.Company;
using API.Services.CompanyService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = "SuperAdmin")]
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;
        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;

        }

        [HttpGet("getAll")]
        public async Task<ActionResult<List<GetCompanyDto>>> GetAllCompanies()
        {
            var response = await _companyService.GetAllCompanies();

            return Ok(response.Data);
        }

        [HttpGet("getSingle")]
        public async Task<ActionResult<GetCompanyDto>> GetSingleCompany(int id)
        {
            var response = await _companyService.GetCompanyById(id);

            if (!response.Success)
            {
                return NotFound(response.Message);
            }

            return Ok(response.Data);
        }


        [HttpPost("addCompany")]
        public async Task<ActionResult<List<GetCompanyDto>>> AddCompany([FromBody] AddCompanyDto newCompany)
        {
            var response = await _companyService.AddCompany(newCompany);

            if (!response.Success)
            {
                return BadRequest();
            }

            return Ok(response.Data);
        }

        [HttpPut("updateCompany")]
        public async Task<ActionResult<GetCompanyDto>> UpdateCompany(UpdateCompanyDto updatedCompany)
        {
            var response = await _companyService.UpdateCompany(updatedCompany);
            if (!response.Success)
            {
                return NotFound(response.Message);
            }

            return Ok(response.Data);
        }

        [HttpDelete("deleteCompany")]
        public async Task<ActionResult<List<GetCompanyDto>>> DeleteCompany(int id)
        {
            var response = await _companyService.DeleteCompany(id);
            if (!response.Success)
            {
                return NotFound(response.Message);
            }

            return Ok(response.Data);
        }
    }
}