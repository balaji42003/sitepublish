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
    <div className="container">
      <div className="center-container">
        <button
          className="btn btn-success mb-3 mt-5"
          onClick={() => navigate("/dealer-dashboard", { state: { dealerid, username } })}
        >
          <ArrowLeft size={18} className="me-1" />
          Back to Dashboard
        </button>
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
              id="brand"
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
              id="description"
            />
          </div>
          <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: $1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
              id="price"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleInputChange}
              name="category"
              id="category"
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
          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
              id="stockQuantity"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
              id="releaseDate"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input className="form-control" type="file" onChange={handleImageChange} />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={(e) => setProduct({ ...product, productAvailable: e.target.checked })}
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="rental"
                id="rentalCheck"
                checked={product.rental}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Rental Item</label>
            </div>
          </div>
          {product.rental && (
            <div className="col-12">
              <label className="form-label">
                <h6>Rental Amount</h6>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Eg: $100"
                onChange={handleInputChange}
                value={product.rentalAmount}
                name="rentalAmount"
                id="rentalAmount"
              />
            </div>
          )}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sellitem;
