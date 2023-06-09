﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models
{
   public class Order
    {
        public int OrderId { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ShipmentTime { get; set; }
        public int Price { get; set; }
        //public User UserBuyer { get; set; }
        public int UserBuyerId { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
    }
}
