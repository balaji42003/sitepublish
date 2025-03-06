import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Sellitem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || localStorage.getItem("username");
  const dealerid = location.state?.dealerid || localStorage.getItem("dealerid");

  useEffect(() => {
    if (location.state?.dealerid) {
      localStorage.setItem("dealerid", location.state.dealerid);
    }
    if (location.state?.username) {
      localStorage.setItem("username", location.state.username);
    }
    console.log("Dealer id in sellitem component:", dealerid);
  }, [location.state, dealerid]);

  const [product, setProduct] = useState({
    dlid: dealerid || "",
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
    rental: false,
    rentalAmount: "",
  });

  useEffect(() => {
    if (dealerid) {
      setProduct((prev) => ({ ...prev, dlid: dealerid }));
    }
  }, [dealerid]);

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct({ ...product, [name]: checked });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/sellproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
        navigate("/dealer-dashboard", { state: { dealerid, username } });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <div className="container">
        <button
          onClick={() => navigate("/dealer-dashboard", { state: { dealerid, username } })}
          style={{
            border: '2px solid rgb(23, 42, 165)',
            color: 'rgb(23, 42, 165)',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            background: 'transparent'
          }}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

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
          }}>Add New Product</h2>

          <form className="row g-4" onSubmit={submitHandler}>
            {[
              { name: 'name', label: 'Product Name', type: 'text', placeholder: 'Product Name', col: '6' },
              { name: 'brand', label: 'Brand', type: 'text', placeholder: 'Enter your Brand', col: '6' },
              { name: 'description', label: 'Description', type: 'text', placeholder: 'Add product description', col: '12' },
              { name: 'price', label: 'Price', type: 'number', placeholder: 'Eg: ₹1000', col: '6' },
              { name: 'stockQuantity', label: 'Stock Quantity', type: 'number', placeholder: 'Stock Remaining', col: '6' },
              { name: 'releaseDate', label: 'Release Date', type: 'date', col: '6' }
            ].map((field) => (
              <div className={`col-md-${field.col}`} key={field.name}>
                <label className="form-label" style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="form-control"
                  placeholder={field.placeholder}
                  name={field.name}
                  value={product[field.name]}
                  onChange={handleInputChange}
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

            <div className="col-md-6">
              <label className="form-label" style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                Category
              </label>
              <select
                className="form-select"
                value={product.category}
                onChange={handleInputChange}
                name="category"
                style={{
                  height: '3rem',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  padding: '0 0.75rem',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="">Select category</option>
                <option value="Laptop">Laptop</option>
                <option value="Headphone">Headphone</option>
                <option value="Mobile">Mobile</option>
                <option value="Electronics">Electronics</option>
                <option value="Toys">Toys</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label" style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                Product Image
              </label>
              <input 
                className="form-control"
                type="file"
                onChange={handleImageChange}
                style={{
                  height: '3rem',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  padding: '0.5rem 0.75rem',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div className="col-12">
              <div className="form-check" style={{ marginBottom: '1rem' }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="productAvailable"
                  checked={product.productAvailable}
                  onChange={(e) => setProduct({ ...product, productAvailable: e.target.checked })}
                  style={{ 
                    borderRadius: '4px',
                    border: '2px solid #e2e8f0'
                  }}
                />
                <label className="form-check-label" style={{ color: '#64748b', marginLeft: '0.5rem' }}>
                  Product Available
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="rental"
                  checked={product.rental}
                  onChange={handleCheckboxChange}
                  style={{ 
                    borderRadius: '4px',
                    border: '2px solid #e2e8f0'
                  }}
                />
                <label className="form-check-label" style={{ color: '#64748b', marginLeft: '0.5rem' }}>
                  Rental Item
                </label>
              </div>
            </div>

            {product.rental && (
              <div className="col-md-6">
                <label className="form-label" style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                  Rental Amount (per day)
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Eg: ₹100"
                  name="rentalAmount"
                  value={product.rentalAmount}
                  onChange={handleInputChange}
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
            )}

            <div className="col-12" style={{ marginTop: '2rem' }}>
              <button
                type="submit"
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
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sellitem;
