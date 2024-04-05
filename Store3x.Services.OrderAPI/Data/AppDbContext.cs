using Microsoft.EntityFrameworkCore;
using Store3x.Services.OrderAPI.Models;
namespace Store3x.Services.OrderAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }
        
    }
    
}
