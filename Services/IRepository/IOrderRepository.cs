using Services.DTO;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IRepository
{
    public interface IOrderRepository
    {
        List<OrderDto> getAllOrdersBuyer(int buyerId);
        List<Order> getAllOrdersSeller(int buyerId);

        List<Order> getAllOrders();

        OrderDto getOrder(int id);

        bool AddNewOrder(OrderDto o);
        bool AddNewOrder(Order o);

        bool DeleteOrder(int id);

    }
}
