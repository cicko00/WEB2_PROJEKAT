using WebShopAPI.Dto;

namespace WebShopAPI.Interfaces
{
    public interface IProductService
    {
        List<ProductDto> GetProducts();
        List<ProductDto> GetProducts(int orderid);
        List<ProductDto> GetAllSellerProducts(int userId);
        ProductDto GetById(int id);
        ProductDto AddProduct(ProductDto newProduct);
        ProductDto UpdateProduct(int id, ProductDto newProductData);
        ProductDto UpdateProductQuantinty(int id);
        bool DeleteProduct(int id);
    }
}
