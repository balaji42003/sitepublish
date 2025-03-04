import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DealerInfoModal from "./components/DealerInfoModal"; // Import the new modal component

const View = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product for dealer info
  const [showDealerInfo, setShowDealerInfo] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id, username } = location.state || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const productsWithImages = await Promise.all(
          response.data.map(async (product) => {
            try {
              const imageResponse = await axios.get(
                `http://localhost:8080/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(imageResponse.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error("Error fetching image:", error);
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(productsWithImages);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product, e) => {
    e.preventDefault();
    addToCart(product);
    navigate('/cart', { 
      state: { 
        id, 
        username,
        cartUpdated: true 
      },
      replace: true
    });
  };

  const handleRent = (product, e) => {
    e.preventDefault();
    navigate('/rent', {
      state: {
        product,
        customerId: id,
        customerName: username
      }
    });
  };

  const handleInfoClick = (e, product) => {
    e.preventDefault(); // Stop the link navigation
    e.stopPropagation(); // Prevent event bubbling
    setSelectedDealer(product);
    setShowDealerInfo(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: '100px', height: '100px' }}/>
      </h2>
    );
  }

  return (
    <div className="bg-light min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header Section with gradient background */}
      <div style={{
        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
        padding: '2rem 0',
        marginBottom: '2rem'
      }}>
        <div className="container">
          <button 
            onClick={() => navigate(-1)} 
            style={{
              background: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#000DFF'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Previous Page
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container" style={{ padding: '2rem 0' }}>
        <div className="row g-4">
          {products.length === 0 ? (
            <div className="col-12" style={{ 
              textAlign: 'center', 
              padding: '5rem 0' 
            }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '3rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ marginBottom: '1rem' }}>No Products Available</h2>
                <p style={{ color: '#6c757d' }}>Check back later for new products</p>
              </div>
            </div>
          ) : (
            products.map((product) => {
              const { id, brand, name, price, productAvailable, imageUrl, rental, rentalAmount } = product;
              return (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={id}>
                  <div style={{
                    background: productAvailable ? 'white' : '#f8f9fa',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    ':hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 12px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                      />
                      {rental && (
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px'
                        }}>
                          <span style={{
                            background: '#dc3545',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem'
                          }}>
                            Rental Available
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '0.75rem'
                      }}>
                        <h5 style={{ margin: 0, fontSize: '1.1rem' }}>{name.toUpperCase()}</h5>
                        <button
                          onClick={(e) => handleInfoClick(e, product)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '2px solid #198754',
                            background: 'transparent',
                            color: '#198754',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className="bi bi-info"></i>
                        </button>
                      </div>
                      
                      <p style={{
                        color: '#6c757d',
                        fontSize: '0.875rem',
                        marginBottom: '1rem'
                      }}>
                        <i className="bi bi-tag me-1"></i>
                        {brand}
                      </p>

                      <div style={{ marginTop: 'auto' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '1rem'
                        }}>
                          <h4 style={{ margin: 0, color: '#198754' }}>₹{price}</h4>
                          {rental && (
                            <button 
                              onClick={(e) => handleRent(product, e)}
                              style={{
                                background: 'transparent',
                                border: '1px solid #dc3545',
                                color: '#dc3545',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              Rent: ₹{rentalAmount}/day
                            </button>
                          )}
                        </div>
                        
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!productAvailable}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: productAvailable ? '#0d6efd' : '#6c757d',
                            color: 'white',
                            cursor: productAvailable ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className={`bi bi-${productAvailable ? 'cart-plus' : 'x-circle'} me-2`}></i>
                          {productAvailable ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Dealer Info Modal */}
      {selectedDealer && (
        <DealerInfoModal
          product={selectedDealer}
          onClose={() => {
            setShowDealerInfo(false);
            setSelectedDealer(null);
          }}
        />
      )}
    </div>
  );
};

export default View;
