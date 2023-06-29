using Services.DTO;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IRepository
{
    public interface IProductRepository
    {
        List<ProductDto> GetAllProducts();
        List<Product> GetAllProductsProducts();
        ProductDto getSingleProduct(int id);
        Product getSingleProductProduct(int id);

        List<ProductDto> GetAllProductsSeller(int idSeller);

        ProductDto AddProduct(Product p);

        bool UpdateProduct(int id,Product p);
        ProductDto UpdateProduct(int id, ProductDto p);

        List<ProductDto> getProductsbyOrder(int id);

        bool DeleteProduct(int id);

        bool Increasequantity(int id,int value);

        bool Decreasequantity(int id, int value);





    }
}
