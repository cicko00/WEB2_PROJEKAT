using Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IProductService
    {
        List<ProductDto> GetProducts();
        List<ProductDto> GetProducts(int orderid);
        List<ProductDto> GetProductsSeller(int orderid);
        List<ProductDto> GetAllSellerProducts(int userId);
        ProductDto GetById(int id);
        ProductDto AddProduct(ProductDto newProduct);
        ProductDto UpdateProduct(int id, ProductDto newProductData);
        ProductDto UpdateProductQuantinty(int id);
        bool DeleteProduct(int id);
    }
}
