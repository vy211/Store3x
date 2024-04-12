using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store3x.Services.OrderAPI.Models
{
    [Table("Store3x_order")]
    public class Order
    {
        [Key]
        public int order_id { get; set; }
        [Required]
        public string buyer_id { get; set; }
        public int card_id { get; set; }
        public decimal total_price { get; set; }
        public DateTime order_date { get; set; }
        public decimal tax { get; set; }
        public decimal shipping_price { get; set; }
        public int delivery_address_id { get; set; }
        public DateTime delivery_date { get; set; }
        public char order_status { get; set; }
        public int quantity { get; set; }
        public string payment_id { get; set; }

    }
}
