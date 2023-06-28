using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
        //public User Seller { get; set; }
        public int SellerId { get; set; }
        public List<OrderProduct> Orders { get; set; }
        public string Category { get; set; }
    }
}
