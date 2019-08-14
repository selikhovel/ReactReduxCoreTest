using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic;
using BusinessLogic.Services;
using DataSource.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Dtos;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productsService;
        private readonly IMapper _mapper;

        public ProductsController(IProductService productsService, IMapper mapper)
        {
            _productsService = productsService;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProducts(int startIndex)
        {
            var prods = _mapper.Map<IEnumerable<ProductDto>>(await _productsService.GetPage(startIndex));
            return Ok(prods);
        }

        // GET: api/Products/5
        [HttpGet("[action]")]
        public async Task<IActionResult> GetProduct(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _productsService.GetById(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProductDto>(product));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductDto product)
        {
            try
            {
                await _productsService.Update(_mapper.Map<Product>(product));
            }

            catch (AppException ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }
    }
}