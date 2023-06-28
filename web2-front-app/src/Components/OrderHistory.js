import React, { useEffect, useState } from 'react';
import axios from 'axios';

import moment from 'moment';
import './Styles/OrderHistory.css';


const OrderHistory = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
  const user = JSON.parse(sessionStorage['User']);
  const userID = parseInt(user.userId);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      const response = await axios.get('https://localhost:7108/api/orders/user/' + userID);
      const orders = response.data.filter(order => moment(order.shipmentTime).isBefore(moment()));
      setOrderHistory(orders);
    } catch (error) {
      console.log('Error fetching order history:', error);
    }
  };

  useEffect(() => {
    const fetchData = async (orderId) => {
      try {
        const response = await axios.get(`https://localhost:7108/api/products/order/${orderId}`);
        const products = response.data.map(item => item.name);
        setOrderHistory(prevOrders => {
          return prevOrders.map(order => {
            if (order.orderId === orderId) {
              return { ...order, products };
            }
            return order;
          });
        });
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    orderHistory.forEach(order => {
      fetchData(order.orderId);
    });
  }, [orderHistory]);

  const renderOrderHistory = () => {
    return orderHistory.map((order) => (
      <div className="order-card" key={order.orderId}>
        <div className="order-info">
          <p>PRODUCTS: {order.products && order.products.join('  ||  ')}</p>
          <p>Comment: {order.comment}</p>
          <p>Address: {order.address}</p>
          <p>Order Date: {moment(order.orderDate).format('YYYY-MM-DD HH:mm')}</p>
          <p>Shipment Time: {moment(order.shipmentTime).format('YYYY-MM-DD HH:mm')}</p>
          <p>Price: $ {order.price}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      {orderHistory.length > 0 ? renderOrderHistory() : <p>No order history found.</p>}
    </div>
  );
};

export default OrderHistory;
