using WebShopAPI.Dto;


namespace WebShopAPI.Interfaces
{
    public interface IOrderService
    {
        List<OrderDto> GetOrders();
        List<OrderDto> GetOrders(int userid);

        OrderDto GetById(int id);
        string AddOrder(OrderDto newOrder);

        string AddOrder(OrderDto newOrder,DateTime st, DateTime ot);
        OrderDto UpdateOrder(int id, OrderDto newOrderData);
        bool DeleteOrder(int id);
    }
}
