using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShopAPI.Dto;
using WebShopAPI.Interfaces;

namespace WebShopAPI.Controllers
{
    
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public static string ER_Message="";



        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Post([FromBody] UserCredentialsDto credDto)
        {
            return Ok(_userService.Login(credDto));
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_userService.GetUsers());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_userService.GetById(id));
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

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (_userService.DeleteUser(id))
            {
                return Ok(_userService.DeleteUser(id));
            }
            return Ok(_userService.DeleteUser(id)); // TREBA NEKI STATUS CODE
        }

    }
}
