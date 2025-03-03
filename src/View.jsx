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
    <div>
      <button onClick={() => navigate(-1)} className="btn btn-warning mt-5 ms-4">
        Back to Previous Page
      </button>
      <div
        className="grid"
        style={{
          marginTop: "64px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          products.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl, rental, rentalAmount } = product;
            return (
              <div
                className="card mb-3"
                style={{
                  width: "250px",
                  height: "360px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: productAvailable ? "#fff" : "#ccc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                }}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      padding: "5px",
                      margin: "0",
                      borderRadius: "10px 10px 10px 10px",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5
                        className="card-title"
                        style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                      >
                        {name.toUpperCase()}
                      </h5>
                      <i
                        className="card-brand"
                        style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                      >
                        {"~ " + brand}
                      </i>
                      {rental && (
                        <button 
                          className="btn btn-danger btn-sm" 
                          style={{ marginLeft: "10px" }}
                          onClick={(e) => handleRent(product, e)}
                        >
                          Rent: ₹{rentalAmount}
                        </button>
                      )}
                      <button
                        className="btn btn-success btn-sm ms-3"
                        style={{
                          width: "30px",
                          height: "20px",
                          fontSize: "8px",
                          padding: "2px 4px"
                        }}
                        onClick={(e) => handleInfoClick(e, product)}
                      >
                        info
                      </button>
                    </div>
                    <hr className="hr-line" style={{ margin: "10px 0" }} />
                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{
                          fontWeight: "600",
                          fontSize: "1.1rem",
                          marginBottom: "5px",
                        }}
                      >
                        <i className="bi bi-currency-rupee"></i>
                        {price}
                      </h5>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ margin: "10px 25px 0px" }}
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!productAvailable}
                    >
                      {productAvailable ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
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
