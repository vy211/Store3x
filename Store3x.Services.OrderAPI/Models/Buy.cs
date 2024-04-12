using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store3x.Services.OrderAPI.Models
{
    [Table("order_product")]
    public class Buy
    {
        [Key]
        public int order_id { get; set; }
        [Required]
        public int product_id { get; set; }
        public int quantity { get; set; }
    }
}
