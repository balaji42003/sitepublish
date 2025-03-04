import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Home, ArrowLeft } from 'lucide-react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, username } = location.state || {};

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
          background: 'white',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <ShoppingBag size={64} className="text-muted mb-4" />
          <h3 className="mb-3">Your cart is empty</h3>
          <p className="text-muted mb-4">Add items to your cart to proceed</p>
          <div className="d-flex justify-content-center gap-3">
            <Link 
              to="/view" 
              state={{ id, username }}
              className="btn btn-primary"
              style={{
                transition: 'all 0.3s ease',
                padding: '0.75rem 1.5rem'
              }}
            >
              Continue Shopping
            </Link>
            <Link 
              to="/customer-dashboard" 
              state={{ id, username }}
              className="btn btn-outline-primary"
              style={{
                transition: 'all 0.3s ease',
                padding: '0.75rem 1.5rem'
              }}
            >
              <Home size={18} className="me-2" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline-secondary"
            style={{
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
            className="btn btn-outline-primary"
            style={{
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>
        <h2 className="mb-0">Shopping Cart</h2>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              {cart.map((item) => (
                <div key={item.id} className="d-flex mb-4 align-items-center">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-2">Price: ₹{item.price}</p>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        className="form-control"
                        style={{ width: '80px' }}
                      />
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                        style={{ transition: 'all 0.3s ease' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <h5 className="mb-0 text-primary">₹{item.price * item.quantity}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="card-title mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="text-primary">₹{cartTotal}</strong>
              </div>
              <button 
                className="btn btn-primary w-100"
                onClick={handleCheckout}
                style={{
                  padding: '0.75rem',
                  transition: 'all 0.3s ease'
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