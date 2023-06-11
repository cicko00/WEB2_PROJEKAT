import Product from "./Product";

export class Order {
    constructor(
      OrderId=0,
      Comment="",
      Address="",
      OrderDate=null,
      Products=[],
      UserBuyerId=0,
      ShipmentTime=null,
      Price=0
      
    ) {
      this.orderId=OrderId;
      this.comment=Comment;
      this.address=Address;
      this.orderDate=OrderDate;
      this.products=Products;
      this.userBuyerId=UserBuyerId;
      this.shipmentTime=ShipmentTime;
      this.price=Price;
    }
  }
  export default Order;
  
  