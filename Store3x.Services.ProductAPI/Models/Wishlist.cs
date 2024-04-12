using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store3x.Services.ProductAPI.Models
{
    [Table("product_wishlist")]
    public class Wishlist
    {
        [Key]
        public string buyer_id { get; set; }
        [Required]
        public int product_id { get; set; }
    }
}
