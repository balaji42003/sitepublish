import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Package, ArrowLeft } from "lucide-react";
import axios from "axios";
import DealerInfoModal from "./components/DealerInfoModal";

const View = ({ addToCart, cart }) => {
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

  const handleBack = () => {
    if (id && username) {
      navigate('/customer-dashboard', {
        state: { id, username },
        replace: true
      });
    } else {
      // If no state, navigate to login
      navigate('/customer-login');
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navigation Header */}
      <div style={{
        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
        padding: '1rem 0',
        marginBottom: '2rem'
      }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button 
              onClick={handleBack}  // Updated handler
              className="btn btn-light"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div className="d-flex gap-3">
              <Link 
                to="/cart" 
                state={{ id, username }}
                className="btn btn-light"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <ShoppingCart size={18} />
                Cart
              </Link>
              
              <Link 
                to="/my-orders" 
                state={{ id, username }}
                className="btn btn-light"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Package size={18} />
                My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          {/* Filters Section */}
          

          {/* Products Grid */}
          <div className="col-lg-9">
            <div className="row g-4">
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="col-12">
                  <div className="text-center py-5 card border-0 shadow-sm">
                    <Package size={48} className="text-muted mx-auto mb-3" />
                    <h4 className="mb-2">No Products Available</h4>
                    <p className="text-muted">Check back later for new products</p>
                  </div>
                </div>
              ) : (
                products.map((product) => {
                  const { id, brand, name, price, productAvailable, imageUrl, rental, rentalAmount } = product;
                  return (
                    <div className="col-md-6 col-lg-4" key={id}>
                      <div className="card h-100 border-0 shadow-sm hover-lift">
                        <div className="position-relative">
                          <img
                            src={imageUrl}
                            alt={name}
                            className="card-img-top"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          {rental && (
                            <div className="position-absolute top-0 end-0 m-2">
                              <span className="badge bg-danger">
                                Rental Available
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title mb-0">{name}</h5>
                            <button
                              onClick={(e) => handleInfoClick(e, product)}
                              className="btn btn-outline-success btn-sm rounded-circle"
                            >
                              <i className="bi bi-info"></i>
                            </button>
                          </div>
                          
                          <p className="text-muted small mb-2">{brand}</p>
                          <h4 className="text-success mb-3">₹{price}</h4>

                          <div className="d-grid gap-2">
                            {rental && (
                              <button 
                                onClick={(e) => handleRent(product, e)}
                                className="btn btn-outline-danger"
                              >
                                Rent: ₹{rentalAmount}/day
                              </button>
                            )}
                            
                            <button
                              onClick={(e) => handleAddToCart(product, e)}
                              disabled={!productAvailable}
                              className={`btn ${productAvailable ? 'btn-primary' : 'btn-secondary'}`}
                            >
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
