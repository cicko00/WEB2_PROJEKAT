using AutoMapper;
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

namespace Services.Services
{
    public class ProductService:IProductService
    {

        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;
        private readonly IProductRepository _productrepository;

        public ProductService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext,IProductRepository pr)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _dbContext = dbContext;
            _productrepository= pr;
        }

        public ProductDto AddProduct(ProductDto newProduct)
        {
            Product product = _mapper.Map<Product>(newProduct);
           return _productrepository.AddProduct(product);
        }
        public ProductDto UpdateProductQuantinty(int id)
        {
            Product product = _productrepository.getSingleProductProduct(id);
            product.Quantity++;
            ProductDto productDto = _mapper.Map<ProductDto>(product);

            _productrepository.UpdateProduct(id, product);
            return productDto;
        }
        public bool DeleteProduct(int id)
        {
           return _productrepository.DeleteProduct(id);

        }
        public List<ProductDto> GetAllSellerProducts(int userId)
        {

            List<ProductDto> p = new List<ProductDto>();
            p = _productrepository.GetAllProductsSeller(userId);
            return p;


        }
        public ProductDto GetById(int id)
        {
            return _productrepository.getSingleProduct(id);
        }

        public List<ProductDto> GetProducts()
        {
            List<ProductDto> lp = new List<ProductDto>();
            foreach (ProductDto p in _productrepository.GetAllProducts())
            {
              //  p.SellerName = _mapper.Map<UserDto>(_dbContext.Users.ToList().Find(x => x.UserId == p.SellerId)).UserName;
                lp.Add(p);
            }
            return lp;
        }

        public List<ProductDto> GetProducts(int orderid)
        {
          

            return _productrepository.getProductsbyOrder(orderid);
        }


        public ProductDto UpdateProduct(int id, ProductDto newProductData)
        {
           

            return _productrepository.UpdateProduct(id, newProductData);
        }

        public List<ProductDto> GetProductsSeller(int orderid)
        {
            throw new NotImplementedException();
        }

    }
}
