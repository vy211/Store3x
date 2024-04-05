using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store3x.Services.OrderAPI.Models
{
    [Table("contact_detail")]
    public class Address
    {
        [Key]
        public int address_id { get; set; }
        [Required]
        public string user_id { get; set; }
        public string street1 { get; set; }
        public string street2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public int zipcode { get; set; }
        public string phone { get; set; }
        public int is_default { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }
    }
}
