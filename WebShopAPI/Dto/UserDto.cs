﻿using WebShopAPI.Models;

namespace WebShopAPI.Dto
{
    public class UserDto
    {
      
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string UserType { get; set; }
        public string Image { get; set; }
    }
}