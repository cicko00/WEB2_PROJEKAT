using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
                        orderProducts.Add(new OrderProduct() { ProductId = matchingProduct.ProductId,Product=matchingProduct,Quantity=productReact.Quantity}) ;
                    }
                }
            }

            Random random = new Random();
            DateTime now = DateTime.Now;
            DateTime futureDate = now.AddDays(15);
            int totalMinutes = (int)(futureDate - now).TotalMinutes;
            int randomMinutes = random.Next(totalMinutes);
            DateTime randomTime = now.AddMinutes(randomMinutes);


            Order o = new Order();
            o.Address = newOrder.Address;
            o.OrderDate = newOrder.OrderDate;
            o.UserBuyerId = newOrder.UserBuyerId;
            foreach(OrderProduct op in orderProducts)
            {
                op.Order = o;
            }
            o.OrderProducts = orderProducts;
            o.Comment= newOrder.Comment;
            o.ShipmentTime = randomTime;
            o.Price=newOrder.Price;

            

            _dbContext.Orders.Add(o);
            _dbContext.SaveChanges();

            return "OK";
        }



        public bool DeleteOrder(int id)
        {
            try
            {
                List<Order> orders = _dbContext.Orders.Include(o => o.OrderProducts).ToList();
                Order order = orders.Find(o => o.OrderId == id);
                if (order == null)
                {
                    return false;
                }
                
                foreach(OrderProduct op in order.OrderProducts.ToList())
                {
                   Product p= _mapper.Map<Product>(_dbContext.Products.Find(op.ProductId));
                    p.Quantity += op.Quantity;
                    _dbContext.SaveChanges();
                }
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

        public List<OrderDto> GetOrders(int userid)
        {
            List<OrderDto> orders =_mapper.Map<List<OrderDto>>(_dbContext.Orders.ToList()).Where(x=>x.UserBuyerId==userid).ToList();
            return orders;
        }

        public List<OrderDto> GetOrdersSeller(int userid)
        {
            var orders = _dbContext.Orders.Where(order => order.OrderProducts.Any(product => product.Product.SellerId == userid)).ToList();
       
            return _mapper.Map<List<OrderDto>>(orders);
        }
        

        public OrderDto UpdateOrder(int id, OrderDto newOrderData)
        {
            Order order = _dbContext.Orders.Find(id);
            order.Comment = newOrderData.Comment;
            order.Address = newOrderData.Address;

            _dbContext.SaveChanges();
            return _mapper.Map<OrderDto>(order);
        }










        public string AddOrder(OrderDto newOrder,DateTime st,DateTime ot)
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
                        orderProducts.Add(new OrderProduct() { ProductId = matchingProduct.ProductId, Quantity = productReact.Quantity });
                    }
                }
            }

            


            Order o = new Order();
            o.Address = newOrder.Address;
            o.OrderDate = newOrder.OrderDate;
            o.UserBuyerId = newOrder.UserBuyerId;
            o.OrderProducts = orderProducts;
            o.Comment = newOrder.Comment;
            o.ShipmentTime = (DateTime)newOrder.ShipmentTime;
            o.Price = newOrder.Price;



            _dbContext.Orders.Add(o);
            _dbContext.SaveChanges();

            return "OK";
        }







    }
}
