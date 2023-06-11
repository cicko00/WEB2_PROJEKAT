using AutoMapper;
using WebShopAPI.Dto;
using WebShopAPI.Infrastructure;
using WebShopAPI.Interfaces;
using WebShopAPI.Models;

namespace WebShopAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;

        public OrderService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _dbContext = dbContext;
        }

        public string AddOrder(OrderDto newOrder)
        {
            List<Product> productsFromReact = _mapper.Map<List<Product>>(newOrder.Products);
            List<Product> productsFromDatabase = _dbContext.Products.ToList();
            List<OrderProduct> orderProducts = new List<OrderProduct>();

            foreach (Product productReact in productsFromReact)
            {
                Product matchingProduct = productsFromDatabase.FirstOrDefault(p => p.ProductId == productReact.ProductId);
                if (matchingProduct != null)
                {
                    if (productReact.Quantity > matchingProduct.Quantity)
                    {
                        return "ERROR";
                    }
                    else
                    {
                        matchingProduct.Quantity -= productReact.Quantity;
                        // Update the quantity in the database
                        _dbContext.Entry(matchingProduct).Property("Quantity").IsModified = true;
                        orderProducts.Add(new OrderProduct() { ProductId = matchingProduct.ProductId,Quantity=productReact.Quantity }) ;
                    }
                }
            }

            
            Order o = new Order();
            o.Address = newOrder.Address;
            o.OrderDate = newOrder.OrderDate;
            o.UserBuyerId = newOrder.UserBuyerId;
            o.OrderProducts = orderProducts;
            o.Comment= newOrder.Comment;

            

            _dbContext.Orders.Add(o);
            _dbContext.SaveChanges();

            return "OK";
        }

        public bool DeleteOrder(int id)
        {
            try
            {
                Order order = _dbContext.Orders.Find(id);
                _dbContext.Orders.Remove(order);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public OrderDto GetById(int id)
        {
            return _mapper.Map<OrderDto>(_dbContext.Orders.Find(id));

        }

        public List<OrderDto> GetOrders()
        {
            return _mapper.Map<List<OrderDto>>(_dbContext.Orders.ToList());
        }

        public OrderDto UpdateOrder(int id, OrderDto newOrderData)
        {
            Order order = _dbContext.Orders.Find(id);
            order.Comment = newOrderData.Comment;
            order.Address = newOrderData.Address;

            _dbContext.SaveChanges();
            return _mapper.Map<OrderDto>(order);
        }
    }
}
