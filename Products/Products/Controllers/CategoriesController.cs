using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using WebApp.Dtos;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IProductService _productsService;
        private readonly IMapper _mapper;

        public CategoriesController(IProductService productsService, IMapper mapper)
        {
            _productsService = productsService;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var cats = _mapper.Map<IEnumerable<CategoryDto>>(await _productsService.GetAllCategories());
            return Ok(cats);
        }
    }
}