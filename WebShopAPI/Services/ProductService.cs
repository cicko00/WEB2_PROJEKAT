using AutoMapper;
using System.Reflection.Metadata.Ecma335;
using WebShopAPI.Dto;
using WebShopAPI.Infrastructure;
using WebShopAPI.Interfaces;
using WebShopAPI.Models;

namespace WebShopAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;

        public ProductService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _dbContext = dbContext;
        }

        public ProductDto AddProduct(ProductDto newProduct)
        {
            Product product = _mapper.Map<Product>(newProduct);
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
            return _mapper.Map<ProductDto>(product);
        }
       public ProductDto UpdateProductQuantinty(int id)
        {
            Product product = _dbContext.Products.Find(id);
            product.Quantity++;
            ProductDto productDto = _mapper.Map<ProductDto>(product);
            
            _dbContext.SaveChanges();
            return productDto;
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
       public List<ProductDto> GetAllSellerProducts(int userId)
        {
           
                 List<ProductDto> p = new List<ProductDto>();
                 p = _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList().Where(x => x.SellerId == userId));
                 return p;


        }
        public ProductDto GetById(int id)
        {
            return _mapper.Map<ProductDto>(_dbContext.Products.Find(id));
        }

        public List<ProductDto> GetProducts()
        {
            List<ProductDto> lp= new List<ProductDto>();
            foreach(ProductDto p in _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList()))
            {
                p.SellerName = _mapper.Map<UserDto>(_dbContext.Users.ToList().Find(x => x.UserId==p.SellerId)).UserName;
                lp.Add(p);
            }
            return lp;
        }

        public List<ProductDto> GetProducts(int orderid)
        {
            var products = _dbContext.Products
                .Where(product => product.Orders.Any(order => order.OrderId == orderid))
                .ToList();

            return _mapper.Map<List<ProductDto>>(products);
        }

        public ProductDto UpdateProduct(int id, ProductDto newProductData)
        {
            Product product = _dbContext.Products.Find(id);
            product.Name = newProductData.Name;
            product.Description = newProductData.Description;
            product.Price = newProductData.Price;
            product.Quantity = newProductData.Quantity;
            product.Image = newProductData.Image;
            product.Category= newProductData.Category;
            _dbContext.SaveChanges();

            return _mapper.Map<ProductDto>(product);
        }

       
    }
}
