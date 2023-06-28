using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShopAPI.Dto;
using WebShopAPI.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace WebShopAPI.Controllers
{
    
    [Route("api/users")]
    [ApiController]
   
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public static string ER_Message="";



        public UserController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
           _configuration= config;
        }

       
        [HttpPost("login")]
      
        public IActionResult Post([FromBody] UserCredentialsDto credDto)
        {
            string i = _userService.Login(credDto);
            return Ok(i);
        }

        [HttpGet("/seller/all")]
      
        public IActionResult GetAll()
        {
           
                return Ok(_userService.GetUsers());
            
          
               
            
        }

        [HttpGet("{id}")]
     
        public IActionResult Get(string id)
        {
           
                int ID = Convert.ToInt32(id);
                return Ok(_userService.GetById(ID));
            
           
        }

        [HttpPost]
        
        public IActionResult CreateUser([FromBody] UserDto user)
        {
            string i = _userService.AddUser(user);
            if (i != "OK")
            {
                
                return Ok(i);
            }
            return Ok("200");
        }

        [HttpPut("{id}")]
        public IActionResult ChangeUser(int id, [FromBody] UserDto user)
        {
           
                return Ok(_userService.UpdateUser(id, user));
            
           
        }

        [HttpPut("admin/{id}/{value}")]
        public IActionResult ChangeUserByAdmin(int id,int value)
        {
            
                return Ok(_userService.UpdateUserByAdmin(id, value));
           
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (_userService.DeleteUser(id))
            {
                return Ok(_userService.DeleteUser(id));
            }
            return Ok(_userService.DeleteUser(id)); // TREBA NEKI STATUS CODE
        }

        [HttpGet("photo/{id}")]
        public IActionResult getPhoto(int id)
        {
            
            return Ok(_userService.getPhoto(id));
        }

    }
}
