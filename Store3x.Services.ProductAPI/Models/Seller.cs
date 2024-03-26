using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store3x.Services.ProductAPI.Models
{
    [Table("Seller")]
    public class Seller
    {
        [Key]
        public string seller_id { get; set; }
        public string company_name { get; set; }
        public string url { get; set; }
        public string description { get; set; }
        public decimal average_rating { get; set; }
        public int rating_count { get; set; }
    }
}
