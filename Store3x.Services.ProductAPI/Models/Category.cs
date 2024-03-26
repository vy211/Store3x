using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store3x.Services.ProductAPI.Models
{
    [Table("category")]
    public class Category
    {
        [Key]
        public int category_id { get; set; }
        [Required]
        public string category_name { get; set; }
    }
}
