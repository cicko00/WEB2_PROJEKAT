export class Product {
    constructor(
      ProductId=0,
      Name="",
      
      Description="",
      Price=0,
      Quantity=1,
      Image="",
      SellerId=0,
      Category,
      
    ) {
      this.productId=ProductId;
      this.name=Name;
      this.description=Description;
      this.price=Price;
      this.quantity=Quantity;
      this.image=Image;
      this.sellerId = SellerId;
      this.category=Category;
      this.sellerName="";
    }
  }
  export default Product;
  
  