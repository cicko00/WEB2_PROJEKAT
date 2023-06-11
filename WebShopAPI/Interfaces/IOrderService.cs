using WebShopAPI.Dto;


namespace WebShopAPI.Interfaces
{
    public interface IOrderService
    {
        List<OrderDto> GetOrders();
       
        OrderDto GetById(int id);
        string AddOrder(OrderDto newOrder);
        OrderDto UpdateOrder(int id, OrderDto newOrderData);
        bool DeleteOrder(int id);
    }
}
