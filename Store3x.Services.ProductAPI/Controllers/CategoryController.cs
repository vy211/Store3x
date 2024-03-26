using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store3x.Services.ProductAPI.Data;
using Store3x.Services.ProductAPI.Models;

namespace Store3x.Services.ProductAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        //cart value
        [HttpGet("/category")]
        public async Task<ActionResult<List<Category>>> GetCategoryValue()
        {
            return _context.Categories.ToList();
        }
    }
}
