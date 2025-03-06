import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AddProductModal({ show, onClose, isDealer, setRefresh, customerId, customerName, dealerid, setCrefresh }) {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    expiryDate: '',
    price: '',
    description: '',
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update form mapping to use handleInputChange
  const formFields = [
    { label: 'Product Name', type: 'text', name: 'name' },
    { 
      label: 'Product Type',
      type: 'select',
      name: 'type',
      options: [
        { value: '', label: 'Select type' },
        { value: 'laptop', label: 'Laptop' },
        { value: 'smartphone', label: 'Smartphone' },
        { value: 'tablet', label: 'Tablet' },
        { value: 'other', label: 'Other' }
      ]
    },
    { label: 'Expiry Date', type: 'date', name: 'expiryDate' },
    ...(isDealer ? [{ label: 'Price', type: 'number', name: 'price' }] : []),
    { label: 'Description', type: 'textarea', name: 'description' },
    ...(isDealer ? [
      { label: 'Customer Name', type: 'text', name: 'customerName' },
      { label: 'Customer Phone', type: 'tel', name: 'customerPhone' },
      { label: 'Customer Email', type: 'email', name: 'customerEmail' }
    ] : [])
  ];

  // Handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Reset error state on each submit
    setLoading(true);  // Start loading

    // Prepare the product object based on the user type
    let productData;

    if (isDealer) {
      // Dealer: include all attributes
      productData = {
        dealerId:dealerid,
        name: product.name,
        type: product.type,
        expiryDate: product.expiryDate,
        price: product.price,
        description: product.description,
        customerName: product.customerName,
        customerPhone: product.customerPhone,
        customerEmail: product.customerEmail
      };

      try {
        console.log(productData);
        // API call for dealer product
        const response = await axios.post('http://localhost:8080/addDealerProduct', productData, {
          headers: {
            'Content-Type': 'application/json',  // Ensure the backend expects JSON
          }
        });
        
        console.log('Dealer product added successfully:', response.data);
        setRefresh(true);

      } catch (err) {
        // Handle error
        console.error('Error adding dealer product:', err);
        setError('Error adding dealer product. Please try again later.');
      }
    } else {
      // Customer: only include 4 relevant attributes
      productData = {
        custid:customerId,
        custname:customerName,
        name: product.name,
        type: product.type,
        expiryDate: product.expiryDate,
        description: product.description
      };

      try {
        // API call for customer product
        const response = await axios.post('http://localhost:8080/addCustomerProduct', productData, {
          headers: {
            'Content-Type': 'application/json',  // Ensure the backend expects JSON
          }
        });
        console.log('Customer product added successfully:', response.data);
        setCrefresh(true);
      } catch (err) {
        // Handle error
        console.error('Error adding customer product:', err);
        setError('Error adding customer product. Please try again later.');
      }
    }

    // Reset the form and close modal
    setProduct({
      name: '',
      type: '',
      expiryDate: '',
      price: '',
      description: '',
      customerName: '',
      customerPhone: '',
      customerEmail: ''
    });
    setLoading(false);  // Stop loading
    onClose();  // Close the modal
    refreshProducts();
  };

  if (!show) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050
      }}
    >
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '80vh', // Add max height
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Fixed Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
          padding: '1.5rem',
          color: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
              {isDealer ? 'Add Product for Sale' : 'Add Product for Recycling'}
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white"
              onClick={onClose}
              style={{ opacity: 0.8, cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div style={{ 
          padding: '2rem',
          overflowY: 'auto',
          maxHeight: 'calc(80vh - 140px)', // Adjust based on header and footer height
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent'
        }}>
          <form onSubmit={handleSubmit}>
            {formFields.map((field, index) => (
              <div className="mb-3" key={index}>
                <label className="form-label" style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    className="form-select"
                    value={product[field.name]}
                    onChange={handleInputChange}
                    required
                    style={{
                      height: '3rem',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      padding: '0 0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {field.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    className="form-control"
                    value={product[field.name]}
                    onChange={handleInputChange}
                    required
                    style={{
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      minHeight: '100px'
                    }}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className="form-control"
                    value={product[field.name]}
                    onChange={handleInputChange}
                    required
                    style={{
                      height: '3rem',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  />
                )}
              </div>
            ))}

            <div className="d-flex gap-3 mt-4">
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? '#cbd5e1' : 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(23, 42, 165, 0.2)',
                  flex: 1,
                  cursor: 'pointer'
                }}
              >
                {loading ? 'Loading...' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: '2px solid rgb(23, 42, 165)',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  color: 'rgb(23, 42, 165)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  flex: 1,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </form>

          {error && (
            <div style={{
              background: '#fff1f2',
              color: '#e11d48',
              padding: '1rem',
              borderRadius: '10px',
              marginTop: '1.5rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Fixed Footer/Buttons */}
        <div style={{
          padding: '1rem 2rem',
          borderTop: '1px solid #e2e8f0',
          background: 'white',
          position: 'sticky',
          bottom: 0,
          zIndex: 1
        }}>
          
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
