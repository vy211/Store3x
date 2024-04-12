using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store3x.Services.ProductAPI.Data;
using Store3x.Services.ProductAPI.Models;

namespace Store3x.Services.ProductAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WishlistController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("/wishlist/{buyerId}")]
        public async Task<ActionResult<List<Wishlist>>> GetWishlistValue(string buyerId)
        {
            var wishlists = await _context.Wishlists
                                      .Where(c => c.buyer_id == buyerId)
                                      .Select(c => new
                                      {
                                          c.buyer_id,
                                          c.product_id
                                      })
                                      .Distinct()
                                      .ToListAsync();

            if (!wishlists.Any())
            {
                return NotFound();
            }

            return Ok(wishlists);
        }


        [HttpPost("addToWishlist")]
        public async Task<ActionResult<Wishlist>> AddToWishlist(Wishlist wishlist)
        {
            try
            {
                var existingWishlistItem = await _context.Wishlists.FirstOrDefaultAsync(c => c.product_id == wishlist.product_id && c.buyer_id == wishlist.buyer_id);

                if (existingWishlistItem != null)
                {
                    // Item already exists in the cart
                    return Conflict("Item already exists in the cart.");
                }

                _context.Wishlists.Add(wishlist);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetWishlistValue), new { buyerId = wishlist.buyer_id }, wishlist);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpDelete("DeleteFromWishList")]
        public async Task<IActionResult> DeleteFromWishList(string buyerId, int productId)
        {
            try
            {
                Console.WriteLine($"Deleting wishlist item for buyerId: {buyerId}, productId: {productId}");

                string sqlQuery = "DELETE FROM [product_wishlist] WHERE [buyer_id] = '{0}' AND [product_id] = {1}";
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
