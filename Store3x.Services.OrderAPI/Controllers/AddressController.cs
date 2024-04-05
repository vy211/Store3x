using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store3x.Services.OrderAPI.Data;
using Store3x.Services.OrderAPI.Models;
using System.Collections.Generic;   
using System.Threading.Tasks;

namespace Store3x.Services.OrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AddressController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
        {
            return await _context.Addresses.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(int id)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        [HttpPost]
        public async Task<ActionResult<Address>> CreateAddress(Address address)
        {
            // Ensure is_default is either 0 or 1
            if (address.is_default != 0 && address.is_default != 1)
            {
                return BadRequest("is_default must be either 0 or 1.");
            }

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAddress), new { id = address.address_id }, address);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAddress(int id, Address address)
        {
            if (id != address.address_id)
            {
                return BadRequest();
            }

            // Ensure is_default is either 0 or 1
            if (address.is_default != 0 && address.is_default != 1)
            {
                return BadRequest("is_default must be either 0 or 1.");
            }

            _context.Entry(address).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddressesByUserId(string userId)
        {
            var addresses = await _context.Addresses.Where(a => a.user_id == userId).ToListAsync();

            if (addresses == null || !addresses.Any())
            {
                return NotFound();
            }

            return addresses;
        }

    }
}
