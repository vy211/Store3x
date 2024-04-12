using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Store3x.Services.OrderAPI.Data;
using Store3x.Services.OrderAPI.Models;

namespace Store3x.Services.OrderAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BuyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BuyController(AppDbContext context)
        {
            _context = context;
        }

        //cart value
        [HttpGet("{orderId}")]
        public async Task<ActionResult<List<Buy>>> GetBuyValue(int orderId)
        {
            var buys = await _context.Buys
                                      .Where(c => c.order_id == orderId)
                                      .Select(c => new {
                                          c.order_id,
                                          c.product_id,
                                          c.quantity
                                      })
                                      .Distinct()
                                      .ToListAsync();

            if (!buys.Any())
            {
                return NotFound();
            }

            return Ok(buys);
        }



        // POST: api/cart/AddToCart
        [HttpPost("AddtoBuy")]
        public async Task<ActionResult<Buy>> AddToCart(Buy buy)
        {
            try
            {
                var existingBuyItem = await _context.Buys.FirstOrDefaultAsync(c => c.product_id == buy.product_id && c.order_id == buy.order_id);

                if (existingBuyItem != null)
                {
                    // Item already exists in the cart
                    return Conflict("Item already exists in the cart.");
                }

                _context.Buys.Add(buy);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetBuyValue), new { buyerId = buy.order_id }, buy);
            }
            catch (DbUpdateException ex)
            {
               return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        [HttpDelete("DeleteFromBuy")]
        public async Task<IActionResult> DeleteFromCart(int orderId, int productId)
        {
            try
            {
                Console.WriteLine($"Deleting buy item for orderId: {orderId}, productId: {productId}");

                string sqlQuery = "DELETE FROM [order_product] WHERE [order_id] = '{0}' AND [product_id] = {1}";
                string formattedSqlQuery = string.Format(sqlQuery, orderId, productId);

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

