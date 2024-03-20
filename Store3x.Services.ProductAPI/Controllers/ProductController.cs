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
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.product_id }, product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.product_id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //cart value
        [HttpGet("/cart/{buyerId}")]
        public async Task<ActionResult<List<Cart>>> GetCartValue(string buyerId)
        {
            var carts = await _context.Carts
                                      .Where(c => c.buyer_id == buyerId)
                                      .Select(c => new {
                                          c.buyer_id,
                                          c.product_id
                                      })
                                      .Distinct()
                                      .ToListAsync();

            if (!carts.Any())
            {
                return NotFound();
            }

            return Ok(carts);
        }


        [HttpPost("/cart/AddToCart")] 
        public async Task<ActionResult<Cart>> AddToCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            // Assuming you have a GetCart method that takes a buyerId to fetch the cart. If not, adjust accordingly.
            return CreatedAtAction("GetCartValue", new { buyerId = cart.buyer_id }, cart);
        }

        // DELETE: api/Products/cart/DeleteFromCart
        [HttpDelete("/cart/DeleteFromCart")]
        public async Task<IActionResult> DeleteFromCart(string buyerId, int productId)
        {
            Console.WriteLine($"Deleting cart item for buyerId: {buyerId}, productId: {productId}");

            // Find the cart item based on buyerId and productId
            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.product_id == productId && c.buyer_id == buyerId);

            if (cartItem == null)
            {
                return NotFound();
            }

            // Remove the found cart item
            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content is a typical response for a successful DELETE operation
        }






        //Seller

        [HttpGet("/seller/{seller_id}")]
        public async Task<ActionResult<Seller>> GetSeller(string seller_id)
        {
            var seller = await _context.Sellers.FindAsync(seller_id);

            if (seller == null)
            {
                return NotFound();
            }

            return seller;
        }
        //show all product of seller

        [HttpGet("/seller/products/{sellerId}")]
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



        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.product_id == id);
        }
    }
}
