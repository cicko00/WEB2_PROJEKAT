using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Services.DTO;
using Services.Infrastructure;
using Services.IRepository;
using Services.IServices;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repository
{
    public class OrderRepository:IOrderRepository
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;


        public OrderRepository(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }

        public bool AddNewOrder(OrderDto o)
        {
            _dbContext.Orders.Add(_mapper.Map<Order>(o));
            _dbContext.SaveChanges();
            return true;
        }

        public bool AddNewOrder(Order o)
        {
            _dbContext.Orders.Add(o);
            _dbContext.SaveChanges();
            return true;
        }

        public bool DeleteOrder(int id)
        {
           Order o= _dbContext.Orders.Find(id);
            _dbContext.Orders.Remove(o);
            _dbContext.SaveChanges();
            return true;
        }

        public List<Order> getAllOrders()
        {
           return _dbContext.Orders.Include(o => o.OrderProducts).ToList();
        }

        public List<OrderDto> getAllOrdersBuyer(int buyerId)
        {
           return _mapper.Map<List<OrderDto>>(_dbContext.Orders.ToList()).Where(x => x.UserBuyerId == buyerId).ToList();
        }

        public List<Order> getAllOrdersSeller(int sellerId)
        {
           return _dbContext.Orders.Where(order => order.OrderProducts.Any(product => product.Product.SellerId == sellerId)).ToList();
        }

        public OrderDto getOrder(int id)
        {
            return _mapper.Map<OrderDto>(_dbContext.Orders.Find(id));
        }
    }
}
