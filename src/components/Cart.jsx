import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Home, ArrowLeft } from 'lucide-react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, username } = location.state || {};

  // Update back button handler to preserve state
  const handleBack = () => {
    navigate("/view", {
      state: { id, username }
    });
  };

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        customerId: id,
        customerName: username,
        cartItems: cart
      }
    });
  };

  const cartTotal = cart.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="container py-5">
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(10px)'
        }}>
          <ShoppingBag size={64} style={{ color: 'rgb(23, 42, 165)' }} className="mb-4" />
          <h3 style={{ color: '#333333', marginBottom: '1rem' }}>Your cart is empty</h3>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Add items to your cart to proceed</p>
          <div className="d-flex justify-content-center gap-3">
            <Link 
              to="/view" 
              state={{ id, username }}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(23, 42, 165, 0.2)'
              }}
            >
              Continue Shopping
            </Link>
            <Link 
              to="/customer-dashboard" 
              state={{ id, username }}
              className="btn"
              style={{
                border: '2px solid rgb(23, 42, 165)',
                color: 'rgb(23, 42, 165)',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Home size={18} />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-3">
            <button 
              onClick={handleBack}
              className="btn"
              style={{
                border: '2px solid rgb(23, 42, 165)',
                color: 'rgb(23, 42, 165)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <Link 
              to="/customer-dashboard" 
              state={{ id, username }}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(23, 42, 165, 0.2)'
              }}
            >
              <Home size={18} />
              Dashboard
            </Link>
          </div>
          <h2 style={{ color: '#333333', margin: 0 }}>Shopping Cart</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-8">
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(10px)'
            }}>
              {cart.map((item) => (
                <div key={item.id} className="d-flex mb-4 align-items-center">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h5 style={{ color: '#333333', marginBottom: '0.5rem' }}>{item.name}</h5>
                    <p style={{ color: '#64748b', marginBottom: '1rem' }}>Price: ₹{item.price}</p>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        style={{
                          width: '80px',
                          height: '40px',
                          borderRadius: '8px',
                          border: '2px solid #e2e8f0',
                          padding: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          border: '2px solid #dc3545',
                          borderRadius: '8px',
                          color: '#dc3545',
                          background: 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <h5 style={{ color: 'rgb(23, 42, 165)', margin: 0 }}>
                      ₹{item.price * item.quantity}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(10px)'
            }}>
              <h4 style={{ color: '#333333', marginBottom: '1.5rem' }}>Order Summary</h4>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#64748b' }}>Subtotal</span>
                <span style={{ color: '#333333' }}>₹{cartTotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#64748b' }}>Shipping</span>
                <span style={{ color: '#10b981' }}>Free</span>
              </div>
              <hr style={{ margin: '1.5rem 0' }} />
              <div className="d-flex justify-content-between mb-4">
                <strong style={{ color: '#333333' }}>Total</strong>
                <strong style={{ color: 'rgb(23, 42, 165)' }}>₹{cartTotal}</strong>
              </div>
              <button 
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(23, 42, 165, 0.2)'
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;