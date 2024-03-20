using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store3x.Services.ProductAPI.Data;
using Store3x.Services.ProductAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store3x.Services.ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SellerController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/seller/{seller_id}
        [HttpGet("{seller_id}")]
        public async Task<ActionResult<Seller>> GetSeller(string seller_id)
        {
            var seller = await _context.Sellers.FindAsync(seller_id);

            if (seller == null)
            {
                return NotFound();
            }

            return seller;
        }

        // GET: api/seller/products/{sellerId}
        [HttpGet("products/{sellerId}")]
        public async Task<ActionResult<List<Product>>> GetSellerProducts(string sellerId)
        {
            var products = await _context.Products
                                          .Where(p => p.seller_id == sellerId)
                                          .ToListAsync();

            if (!products.Any())
            {
                return NotFound();
            }

            return Ok(products);
        }


    }
}
