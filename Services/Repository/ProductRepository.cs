using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Services.DTO;
using Services.Infrastructure;
using Services.IRepository;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repository
{
    public class ProductRepository : IProductRepository
    {

        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;


        public ProductRepository(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }


        public ProductDto AddProduct(Product p)
        {
            _dbContext.Products.Add(p);
            _dbContext.SaveChanges();
            return _mapper.Map<ProductDto>(p);
        }

        public bool Decreasequantity(int id, int value)
        {
            Product p = _dbContext.Products.Find(id);
            p.Quantity-=value;
            _dbContext.SaveChanges();
            return true;
        }

        public bool DeleteProduct(int id)
        {
            try
            {
                Product product = _dbContext.Products.Find(id);
                _dbContext.Products.Remove(product);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<ProductDto> GetAllProducts()
        {
            return _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList());
        }

        public List<Product> GetAllProductsProducts()
        {
            return _dbContext.Products.ToList();
        }

        public List<ProductDto> GetAllProductsSeller(int idSeller)
        {
            return _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList().Where(x => x.SellerId == idSeller));
        }

        public List<ProductDto> getProductsbyOrder(int id)
        {
            var products = _dbContext.Products
                .Where(product => product.Orders.Any(order => order.OrderId == id))
                .ToList();

            return _mapper.Map<List<ProductDto>>(products);
        }

        public ProductDto getSingleProduct(int id)
        {
           return _mapper.Map<ProductDto>(_dbContext.Products.Find(id));
        }

        public Product getSingleProductProduct(int id)
        {
            return _dbContext.Products.Find(id);
        }

        public bool Increasequantity(int id, int value)
        {
            throw new NotImplementedException();
        }

        public bool UpdateProduct(int id, Product p)
        {
            Product pp= _dbContext.Products.Find(id);
            pp.Name = p.Name;
            pp.Price = p.Price;
            pp.Category = p.Category;
            pp.Description= p.Description;
            pp.Quantity = p.Quantity;
            pp.Image= p.Image;
            _dbContext.SaveChanges();
            return true;
        }

        public ProductDto UpdateProduct(int id, ProductDto p)
        {
            Product pp = _dbContext.Products.Find(id);
            pp.Name = p.Name;
            pp.Price = p.Price;
            pp.Category = p.Category;
            pp.Description = p.Description;
            pp.Quantity = p.Quantity;
            pp.Image = p.Image;
            _dbContext.SaveChanges();
            return _mapper.Map<ProductDto>(pp);
        }
    }
}
