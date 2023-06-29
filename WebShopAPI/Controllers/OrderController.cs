using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

using Microsoft.AspNetCore.Authorization;
using Services.IServices;
using Services.DTO;

namespace WebShopAPI.Controllers
{
    [Route("api/orders")]
    [ApiController]
    
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IConfiguration _configuration;

        public OrderController(IOrderService orderService, IConfiguration config)
        {
            _orderService = orderService;
           _configuration=config;
        }
      


        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetOrders());
        }

        [HttpGet("user/{userid}")]
        public IActionResult GetUserProducts(int userid)
        {
            
            return Ok(_orderService.GetOrders(userid));
            
            
        }

        [HttpGet("seller/{userid}")]
        public IActionResult GetSellerProducts(int userid)
        {

            return Ok(_orderService.GetOrdersSeller(userid));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_orderService.GetById(id));
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderDto order)
        {
           
            
                return Ok(_orderService.AddOrder(order));
            
           
        }

        [HttpPost("{st}/{ot}")]
        public IActionResult CreateOrderTest([FromBody] OrderDto order,DateTime st,DateTime ot)
        {
            return Ok(_orderService.AddOrder(order,st,ot));
        }

        [HttpPut("{id}")]
        public IActionResult ChangeOrder(int id, [FromBody] OrderDto order)
        {
           
                return Ok(_orderService.UpdateOrder(id, order));
            
          
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            
                if (_orderService.DeleteOrder(id))
                {
                    return Ok(_orderService.DeleteOrder(id));
                }

                return Ok(_orderService.DeleteOrder(id));
          
        }
    }
}
