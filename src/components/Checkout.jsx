import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Checkout = ({ cart, clearCart }) => {
  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId, customerName, rentalDetails } = location.state || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const saveOrderDetails = (paymentMethod) => {
    const orderDetails = {
      customerId,
      customerName,
      address,
      items: rentalDetails ? [rentalDetails] : cart.map(item => ({
        product: {
          name: item.name,
          type: 'Normal'
        },
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: rentalDetails ? rentalDetails.totalRentalAmount : cart.reduce((total, item) => total + item.price * item.quantity, 0),
      orderDate: new Date().toISOString(),
      status: 'Pending',
      productType: rentalDetails ? 'Rental' : 'Normal',
      paymentMethod: paymentMethod
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    clearCart();
    navigate('/my-orders', { 
      state: { id: customerId, username: customerName }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveOrderDetails('Online Payment');
  };

  const handlePayment = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const amount = rentalDetails 
        ? rentalDetails.totalRentalAmount * 100 
        : cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100;

      const options = {
        key: "rzp_live_kYGlb6Srm9dDRe", // Replace with your Razorpay Key ID
        amount: amount, // Amount in paise
        currency: "INR",
        name: "EasyBuy",
        description: rentalDetails ? "Rental Payment" : "Purchase Payment",
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          saveOrderDetails('Online Payment');
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        notes: {
          address: `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.zip}`,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };

  const handleCOD = () => {
    // Handle Cash on Delivery logic here
    console.log('Order placed with Cash on Delivery:', { rentalDetails, cart, address });
    saveOrderDetails('Cash on Delivery');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="btn"
          style={{
            border: '2px solid rgb(23, 42, 165)',
            color: 'rgb(23, 42, 165)',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            color: '#333333',
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: '600'
          }}>Checkout</h2>

          {rentalDetails ? (
            <div style={{
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h4 style={{ color: '#333333', marginBottom: '1.5rem' }}>Rental Details</h4>
              <hr style={{ margin: '1rem 0' }} />
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#64748b' }}>Product Name</label>
                  <p style={{ color: '#333333', fontWeight: '500' }}>{rentalDetails.product.name}</p>
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#64748b' }}>Rental Duration</label>
                  <p style={{ color: '#333333', fontWeight: '500' }}>{rentalDetails.rentalDuration} days</p>
                </div>
                <div className="col-md-12">
                  <label className="form-label" style={{ color: '#64748b' }}>Total Amount</label>
                  <p style={{ color: 'rgb(23, 42, 165)', fontWeight: '600', fontSize: '1.25rem' }}>
                    ₹{rentalDetails.totalRentalAmount}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h4 style={{ color: '#333333', marginBottom: '1.5rem' }}>Order Summary</h4>
              <hr style={{ margin: '1rem 0' }} />
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 style={{ color: '#333333', marginBottom: '0.25rem' }}>{item.name}</h6>
                    <p style={{ color: '#64748b', margin: 0 }}>Quantity: {item.quantity}</p>
                  </div>
                  <p style={{ color: 'rgb(23, 42, 165)', fontWeight: '500', margin: 0 }}>
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
              <hr style={{ margin: '1rem 0' }} />
              <div className="d-flex justify-content-between align-items-center">
                <h5 style={{ color: '#333333', margin: 0 }}>Total</h5>
                <h5 style={{ color: 'rgb(23, 42, 165)', margin: 0 }}>
                  ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}
                </h5>
              </div>
            </div>
          )}

          <h4 style={{ color: '#333333', marginBottom: '1.5rem' }}>Shipping Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {[
                { name: 'name', label: 'Full Name', type: 'text' },
                { name: 'email', label: 'Email Address', type: 'email' },
                { name: 'phone', label: 'Phone Number', type: 'text' },
                { name: 'addressLine1', label: 'Address Line 1', type: 'text' },
                { name: 'addressLine2', label: 'Address Line 2', type: 'text' },
                { name: 'city', label: 'City', type: 'text' },
                { name: 'state', label: 'State', type: 'text' },
                { name: 'zip', label: 'ZIP Code', type: 'text' }
              ].map((field) => (
                <div className="col-md-6" key={field.name}>
                  <label className="form-label" style={{ color: '#64748b' }}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={address[field.name]}
                    onChange={handleInputChange}
                    className="form-control"
                    required={field.name !== 'addressLine2'}
                    style={{
                      height: '3rem',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="d-flex gap-3 mt-4">
              <button
                type="button"
                onClick={handlePayment}
                style={{
                  background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1rem 2rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(23, 42, 165, 0.2)'
                }}
              >
                Pay Online
              </button>
              <button
                type="button"
                onClick={handleCOD}
                style={{
                  background: 'transparent',
                  border: '2px solid rgb(23, 42, 165)',
                  borderRadius: '10px',
                  padding: '1rem 2rem',
                  color: 'rgb(23, 42, 165)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                Cash on Delivery
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
