import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, Home } from 'lucide-react';

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
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div className="d-flex gap-3 mb-4">
          <button 
            onClick={() => navigate(-1)}
            style={{
              border: '2px solid rgb(23, 42, 165)',
              color: 'rgb(23, 42, 165)',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent'
            }}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <Link 
            to="/customer-dashboard"
            state={{ id, username }}
            style={{
              background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(23, 42, 165, 0.2)'
            }}
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            color: '#333333',
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: '600'
          }}>My Orders</h2>

          {orders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              border: '2px dashed #e2e8f0',
              borderRadius: '15px'
            }}>
              <Package size={48} style={{ color: 'rgb(23, 42, 165)', marginBottom: '1rem' }} />
              <h4 style={{ color: '#333333', marginBottom: '0.5rem' }}>No Orders Found</h4>
              <p style={{ color: '#64748b' }}>Your order history will appear here</p>
            </div>
          ) : (
            <div className="table-responsive" style={{
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <table className="table" style={{ margin: 0 }}>
                <thead>
                  <tr style={{
                    background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
                  }}>
                    <th style={{ color: 'white', padding: '1rem', border: 'none' }}>Order ID</th>
                    <th style={{ color: 'white', padding: '1rem', border: 'none' }}>Order Date</th>
                    <th style={{ color: 'white', padding: '1rem', border: 'none' }}>Product Name</th>
                    <th style={{ color: 'white', padding: '1rem', border: 'none' }}>Product Type</th>
                    <th style={{ color: 'white', padding: '1rem', border: 'none' }}>Payment Method</th>
                    <th style={{ color: 'white', padding: '1rem', border: 'none' }}>Total Amount</th>
                    <th style={{ color: 'white', padding: '1rem', border: 'none' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} style={{
                      transition: 'all 0.3s ease',
                      backgroundColor: 'white'
                    }}>
                      <td style={{ padding: '1rem', borderColor: '#e2e8f0' }}>{index + 1}</td>
                      <td style={{ padding: '1rem', borderColor: '#e2e8f0' }}>
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem', borderColor: '#e2e8f0' }}>
                        {order.items && order.items[0] && order.items[0].product ? order.items[0].product.name : 'N/A'}
                      </td>
                      <td style={{ padding: '1rem', borderColor: '#e2e8f0' }}>{order.productType}</td>
                      <td style={{ padding: '1rem', borderColor: '#e2e8f0' }}>{order.paymentMethod}</td>
                      <td style={{ padding: '1rem', borderColor: '#e2e8f0', color: 'rgb(23, 42, 165)', fontWeight: '500' }}>
                        ₹{order.totalAmount}
                      </td>
                      <td style={{ padding: '1rem', borderColor: '#e2e8f0' }}>
                        <button
                          onClick={() => handleRemoveOrder(index)}
                          style={{
                            padding: '0.5rem 1rem',
                            border: '2px solid #dc3545',
                            borderRadius: '8px',
                            color: '#dc3545',
                            background: 'transparent',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseOver={e => {
                            e.target.style.background = '#dc3545';
                            e.target.style.color = 'white';
                          }}
                          onMouseOut={e => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#dc3545';
                          }}
                        >
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
      </div>
    </div>
  );
};

export default MyOrders;