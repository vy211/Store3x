using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store3x.Services.ProductAPI.Data;
using Store3x.Services.ProductAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store3x.Services.ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cart/{buyerId}
        [HttpGet("{buyerId}")]
        public async Task<ActionResult<List<Cart>>> GetCartValue(string buyerId)
        {
            var carts = await _context.Carts
                                      .Where(c => c.buyer_id == buyerId)
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

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
