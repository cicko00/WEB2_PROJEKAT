using Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IOrderService
    {
        List<OrderDto> GetOrders();
        List<OrderDto> GetOrders(int userid);
        List<OrderDto> GetOrdersSeller(int userid);

        OrderDto GetById(int id);
        string AddOrder(OrderDto newOrder);

        string AddOrder(OrderDto newOrder, DateTime st, DateTime ot);
        OrderDto UpdateOrder(int id, OrderDto newOrderData);
        bool DeleteOrder(int id);
    }
}
