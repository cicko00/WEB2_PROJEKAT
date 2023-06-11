import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Styles/Chart.css';
import { Product } from '../Models/Product';
import { Order } from '../Models/Order';
import moment from 'moment';

const Chart = ({ chartItems, setChartItems, isLoggedIn }) => {
  const user = JSON.parse(sessionStorage['User']);
  const [comment, setComment] = useState('Bez napomene');
  const [address, setAddress] = useState('Bez napomene');
  let [orderDate, setOrderDate] = useState(null);
  var [price,setPrice]=useState(0);

  useEffect(() => {
    let totalPrice = 0;
       chartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    
    setPrice(totalPrice);
  }, []);


  const handleOrder = async () => {
    try {
      // Prepare the order data
      
      const orderData = {
        // Add necessary properties for the order (e.g., comment, address, etc.)
        // based on your requirements
        products: chartItems.map((item) => new Product(item.productId, item.name, item.description, item.price, item.quantity, item.image, item.sellertId, item.category)),
      };

      


      orderDate=moment().format();
      const order = new Order(0, comment, address, orderDate, orderData.products, user.userId,null,price);
      console.log(order)
      // Make a POST request to send the order data to the backend
      const response = await axios.post('https://localhost:7108/api/orders', order);
      if (response.data === 'ERROR') {
        alert('SOMETHING IS WRONG WITH YOUR ORDER');
      } else {
        alert('Order Placed!');
      }

      // Clear the chart items
      setChartItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromChart = (productId) => {
    setChartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  return (
    <div className="chart-container">
      <h2>Chart</h2>
      {chartItems.length === 0 ? (
        <p>Your chart is empty.</p>
      ) : (
        <div className="chart-items">
          {chartItems.map((item) => (
            <div className="chart-item" key={item.productId}>
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromChart(item.productId)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoggedIn && chartItems.length > 0 && (
        <div className="order-section">
          <h3>Order Details</h3>
          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>
          <p>Order price: ${price}</p>
          <button className="order-button" onClick={handleOrder}>
            Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Chart;
