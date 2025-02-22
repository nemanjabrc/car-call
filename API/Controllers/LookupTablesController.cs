using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Category;
using API.DTOs.VehicleManufacturer;
using API.DTOs.VehicleModel;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LookupTablesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LookupTablesController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        [HttpGet]
        [Route("getCategories")]
        public async Task<ActionResult<List<GetCategoryDto>>> GetCategories()
        {
            var categories = await _context.Categories.Select(c => _mapper.Map<GetCategoryDto>(c)).ToListAsync();

            return Ok(categories);
        }

        [HttpGet]
        [Route("getManufacturers")]
        public async Task<ActionResult<List<GetVehicleManufacturerDto>>> GetManufacturers(int categoryId)
        {
            var manufacturers = await _context.VehicleManufacturers
                .Where(m => m.CategoryId == categoryId)
                .Select(m => _mapper.Map<GetVehicleManufacturerDto>(m))
                .ToListAsync();

            return Ok(manufacturers);
        }

        [HttpGet]
        [Route("getModels")]
        public async Task<ActionResult<List<GetVehicleModelDto>>> GetModels(int manufacturerId)
        {
            var models = await _context.VehicleModels
                .Where(m => m.VehicleManufacturerId == manufacturerId)
                .Select(m => _mapper.Map<GetVehicleModelDto>(m))
                .ToListAsync();

            return Ok(models);
        }
    }
}