import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-warning mt-5">
        Back to Previous Page
      </button>
      <h2 className="mb-4">Checkout</h2>
      {rentalDetails ? (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Rental Details</h4>
            <hr />
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <p className="form-control-plaintext">{rentalDetails.product.name}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Rental Duration (days)</label>
              <p className="form-control-plaintext">{rentalDetails.rentalDuration}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Total Rental Amount</label>
              <p className="form-control-plaintext">₹{rentalDetails.totalRentalAmount}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Cart Details</h4>
            <hr />
            {cart.map((item) => (
              <div key={item.id} className="mb-3">
                <label className="form-label">{item.name}</label>
                <p className="form-control-plaintext">Quantity: {item.quantity}</p>
                <p className="form-control-plaintext">Price: ₹{item.price}</p>
              </div>
            ))}
            <div className="mb-3">
              <label className="form-label">Total Amount</label>
              <p className="form-control-plaintext">₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
            </div>
          </div>
        </div>
      )}
     
      <form className="mt-4" onSubmit={handleSubmit}>
        <h2 className="mb-4">Shipping details</h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={address.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={address.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={address.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address Line 1</label>
          <input
            type="text"
            className="form-control"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address Line 2</label>
          <input
            type="text"
            className="form-control"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Zip</label>
          <input
            type="text"
            className="form-control"
            name="zip"
            value={address.zip}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="button" className="btn btn-primary me-2" onClick={handlePayment}>
          Confirm Payment
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCOD}>
          Cash on Delivery
        </button>
      </form>
    </div>
  );
};

export default Checkout;
