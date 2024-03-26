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



        [HttpDelete("DeleteFromCart")]
        public async Task<IActionResult> DeleteFromCart(string buyerId, int productId)
        {
            try
            {
                Console.WriteLine($"Deleting cart item for buyerId: {buyerId}, productId: {productId}");

                string sqlQuery = "DELETE FROM [product_shoppingcart] WHERE [buyer_id] = '{0}' AND [product_id] = {1}";
                string formattedSqlQuery = string.Format(sqlQuery, buyerId, productId);

                int rowsAffected = await _context.Database.ExecuteSqlRawAsync(formattedSqlQuery);

                if (rowsAffected == 0)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500); // Internal Server Error
            }
        }





    }
}
