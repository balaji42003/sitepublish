import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Rent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, customerId, customerName } = location.state || {};
  const [rentalDuration, setRentalDuration] = useState(1); // Default rental duration is 1 day

  const handleRentalDurationChange = (e) => {
    setRentalDuration(e.target.value);
  };

  const handleConfirmRental = () => {
    const totalRentalAmount = rentalDuration * product.rentalAmount;
    // Handle rental confirmation logic here (e.g., save rental details to the database)
    console.log("Rental confirmed:", {
      product,
      customerId,
      customerName,
      rentalDuration,
      totalRentalAmount,
    });
    navigate('/checkout', { 
      state: { 
        customerId, 
        customerName,
        rentalDetails: {
          product,
          rentalDuration,
          totalRentalAmount
        }
      },
      replace: true
    });
  };

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-info mt-5">
        Back to Previous Page
      </button>
      <h2 className="mb-4">Rent {product.name}</h2>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Rental Details</h4>
          <hr />
          <div className="mb-3">
            <label className="form-label">Rental Duration (days)</label>
            <input
              type="number"
              className="form-control"
              value={rentalDuration}
              onChange={handleRentalDurationChange}
              min="1"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rental Amount per Day</label>
            <p className="form-control-plaintext">₹{product.rentalAmount}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Total Rental Amount</label>
            <p className="form-control-plaintext">₹{rentalDuration * product.rentalAmount}</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleConfirmRental}
          >
            Confirm Rental
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rent;