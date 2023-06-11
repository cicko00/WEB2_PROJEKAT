import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Styles/ActiveOrders.css';

const ActiveOrders = () => {
  const user = JSON.parse(sessionStorage['User']);
  const userID = parseInt(user.userId);
  const [activeOrders, setActiveOrders] = useState([]);

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const fetchActiveOrders = async () => {
    try {
      const response = await axios.get('https://localhost:7108/api/orders/user/' + userID);
      const orders = response.data.filter(order => moment(order.shipmentTime).isAfter(moment()));
      setActiveOrders(orders);
    } catch (error) {
      console.log('Error fetching active orders:', error);
    }
  };

  const handleDismissOrder = async (orderId) => {
    try {
      await axios.delete(`https://localhost:7108/api/orders/${orderId}`);
      fetchActiveOrders();
    } catch (error) {
      console.log('Error dismissing order:', error);
    }
  };

  useEffect(() => {
    const fetchData = async (orderId) => {
      try {
        const response = await axios.get(`https://localhost:7108/api/products/order/${orderId}`);
        const products = response.data.map(item => item.name);
        setActiveOrders(prevOrders => {
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

    activeOrders.forEach(order => {
      fetchData(order.orderId);
    });
  }, [activeOrders]);

  const renderOrders = () => {
    return activeOrders.map((order) => (
      <div className="order-card" key={order.orderId}>
        <div className="order-info">
          <p>PRODUCTS: {order.products && order.products.join('  ||  ')}</p>
          <p>Comment: {order.comment}</p>
          <p>Address: {order.address}</p>
          <p>Order Date: {moment(order.orderDate).format('YYYY-MM-DD HH:mm')}</p>
          <p>Shipment Time: {moment(order.shipmentTime).format('YYYY-MM-DD HH:mm')}</p>
          <p>Price:$ {order.price}</p>
        </div>
        <div className="dismiss-button">
        {moment().subtract(1, 'hour').isBefore(moment(order.orderDate)) && (
            <button onClick={() => handleDismissOrder(order.orderId)}>Dismiss Order</button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="active-orders-container">
      <h2 className="active-orders-title">Active Orders</h2>
      {activeOrders.length > 0 ? renderOrders() : <p>No active orders found.</p>}
    </div>
  );
};

export default ActiveOrders;
