namespace Store3x.Services.OrderAPI.Models.Dto
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public string BuyerId { get; set; }
        public int CardId { get; set; }
        public double TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public double Tax { get; set; } = 10; // Default value
        public double ShippingPrice { get; set; } = 10; // Default value
        public int DeliveryAddressId { get; set; }
        public DateTime DeliveryDate { get; set; }
        public char OrderStatus { get; set; }
        public int Quantity { get; set; }
    }
}
