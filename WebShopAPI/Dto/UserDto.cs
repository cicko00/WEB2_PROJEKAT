using Microsoft.Extensions.Diagnostics.HealthChecks;
using WebShopAPI.Models;

namespace WebShopAPI.Dto
{
    public class UserDto
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

        public bool Fbuser { get; set; }
        public string Address { get; set; }
        public string? OldPassword { get; set; } = null;
    }
}
