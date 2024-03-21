using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store3x.Services.ProductAPI.Data;
using Store3x.Services.ProductAPI.Models;

namespace Store3x.Services.ProductAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
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



        // POST: api/cart/AddToCart
        [HttpPost("AddToCart")]
        public async Task<ActionResult<Cart>> AddToCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartValue), new { buyerId = cart.buyer_id }, cart);
        }



        // DELETE: api/cart/DeleteFromCart
        [HttpDelete("DeleteFromCart")]
        public async Task<IActionResult> DeleteFromCart(string buyerId, int productId)
        {
            Console.WriteLine($"Deleting cart item for buyerId: {buyerId}, productId: {productId}");

            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.product_id == productId && c.buyer_id == buyerId);

            if (cartItem == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cartItem); // Remove only the first matching cart item
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
