import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { id, username } = location.state || {};

  useEffect(() => {
    const fetchOrders = () => {
      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const customerOrders = existingOrders.filter(order => order.customerId === id);
      setOrders(customerOrders);
    };

    fetchOrders();
  }, [id]);

  const handleRemoveOrder = (index) => {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = existingOrders.filter((order, i) => i !== index);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders.filter(order => order.customerId === id));
  };

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-warning mt-0">
        Back to Previous Page
      </button>
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center py-5">
          <h4>No orders found</h4>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Payment Method</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.items && order.items[0] && order.items[0].product ? order.items[0].product.name : 'N/A'}</td>
                  <td>{order.productType}</td>
                  <td>{order.paymentMethod}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleRemoveOrder(index)}>
                      Remove Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;