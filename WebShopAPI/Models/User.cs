namespace WebShopAPI.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string UserType { get; set; }
        public string Image { get; set; }
        public int Verified { get; set; } = 1;
        public bool Fbuser { get; set; } = false;
        public string? Address { get; set; }
        public List<Order> CreatedOrders { get; set; }
        public List<Product> UserProducts { get; set; }
    }
}
