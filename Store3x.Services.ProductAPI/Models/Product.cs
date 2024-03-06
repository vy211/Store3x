using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store3x.Services.ProductAPI.Models
{
    [Table("Product")]
    public class Product
    {
        [Key]
        public int product_id { get; set; }
        public string name { get; set; }
        public string seller_id { get; set; }
        public decimal price { get; set; }
        public decimal rating { get; set; }
        public int review_count { get; set; }
        public int category_id { get; set; }
        public string description { get; set; }
        public decimal discount_percent { get; set; }
        public int available_units { get; set; }
        public string color { get; set; }
        public int in_stock { get; set; }
        public decimal weight { get; set; }
        public int carrier_id { get; set; }
    }

}
