import React, { useState, useEffect } from 'react'; 
import { Briefcase, CheckCircle, Inbox, Package, ShoppingBag, UserCheck2Icon, LucideDelete, ArrowRightIcon } from 'lucide-react'; 
import AddProductModal from '../components/AddProductModal'; 
import axios from 'axios'; 
import '../DealerDashboard.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

function DealerDashboard() { 
  const [showAddModal, setShowAddModal] = useState(false); 
  const [sellitem, setSellitem] = useState(false); 
  const [products, setProducts] = useState([]); 
  const [recieved, setRecieved] = useState(0); 
  const [refresh, setRefresh] = useState(false); 
  const [viewCustomerProducts, setViewCustomerProducts] = useState(false); 
  const [dealerInfo, setDealerInfo] = useState(null);
  const location = useLocation(); 
  const navigate = useNavigate();
  const username = location.state?.username; 
  const dealerid = location.state?.dealerid; 

  // Fetch products from the backend 
  const fetchProducts = async () => { 
    try { 
      setProducts([]); // Reset products to force re-fetching 
      const url = viewCustomerProducts
        ? 'http://localhost:8080/getcustomerproducts'
        : `http://localhost:8080/getdealerproduct/${dealerid}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleSellItemClick = () => {
console.log(dealerid,username);
    navigate('/sell', { state: { dealerid, username } });

  };

  // Fetch dealer info including shop photo
  const fetchDealerInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/dealerinfo/${dealerid}`);
      setDealerInfo(response.data);
    } catch (error) {
      console.error('Error fetching dealer info:', error);
    }
  };

  // Fetch products and dealer info when component mounts or when toggling between dealer and customer products
  useEffect(() => {
    fetchDealerInfo();
    fetchProducts();
  }, [refresh]);

  // Handle toggling between dealer and customer products
  const toggleView = () => {
    setViewCustomerProducts((prev) => !prev);
    setRefresh((prev) => !prev); // Force refresh
  };

  const increment=()=>{
    setRecieved(recieved + 1);
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${productId}`);
      setRefresh(!refresh); // Trigger refresh to update the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle accepting a customer request
  const handleAcceptRequest = async (productId) => {
    try {
      await axios.put(`http://localhost:8080/updateStatus/${productId}`, { status: 'Accepted' });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, status: 'Accepted' } : product
        )
      );
      setRefresh(!refresh); // Trigger refresh to update the product list

      // Notify the customer side about the status update
      await axios.post('http://localhost:8080/notifyCustomer', { productId, status: 'Accepted' });
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  // Handle adding a new product (called from AddProductModal)
  const handleAddProduct = (newProduct) => {
    // Add the new product to the current list
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowAddModal(false); // Close the modal after successful product addition
    setRefresh((prev) => !prev); // Refresh the product list
  };

  return (
    <div className="dashboard-container">
      {/* Background Image Section */}
      <div 
        className="shop-photo-background"
        style={{
          backgroundImage: dealerInfo?.shopPhotoData 
            ? `url(data:${dealerInfo.shopPhotoType};base64,${dealerInfo.shopPhotoData})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          position: 'relative'
        }}
      >
        {/* Overlay with gradient */}
        <div className="overlay">
          <div className="dealer-info">
            <h1>{username}</h1>
            <p>{dealerInfo?.location}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="dashboard-content">
        {/* Action Buttons */}
        <div className="action-buttons mb-4">
          <button className="btn btn-primary me-2" onClick={toggleView}>
            <CheckCircle size={18} className="me-1" />
            {viewCustomerProducts ? "Show Dealer Products" : "Approve Requests"}
          </button>
          <button className="btn btn-success me-2" onClick={handleSellItemClick}>
            <Package size={18} className="me-1" />
            Upload Product
          </button>
          <button className="btn btn-info" onClick={() => setShowAddModal(true)}>
            <Package size={18} className="me-1" />
            Sell Item
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <Package size={24} className="text-primary" />
            <h3>Products Listed</h3>
            <h2>{products.length}</h2>
          </div>
          <div className="stat-card">
            <Inbox size={24} className="text-success" />
            <h3>Recovered Items</h3>
            <h2>{recieved}</h2>
          </div>
          <div className="stat-card">
            <ShoppingBag size={24} className="text-info" />
            <h3>Collected Items</h3>
            <h2>0</h2>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-section">
          {products.length === 0 ? (
            <div className="text-center py-5">
              <Package size={48} className="text-muted mb-3" />
              <h4>No products available</h4>
              <p className="text-muted">
                {viewCustomerProducts
                  ? "No customer requests at the moment."
                  : "Click the 'Sell Item' button to list your first product."}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Type</th>
                    <th>{viewCustomerProducts ? "Description" : "Price"}</th>
                    <th>Expiry Date</th>
                    <th>{viewCustomerProducts ? "Customer Name" : "Description"}</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id || index}>
                      <td>{product.name}</td>
                      <td>{product.type}</td>
                      <td>{viewCustomerProducts ? product.description : product.price}</td>
                      <td>{product.expiryDate}</td>
                      <td>{viewCustomerProducts ? product.custname : product.description}</td>
                      <td>
                        {!viewCustomerProducts ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDeleteProduct(product.id);
                              increment();
                            }}
                          >
                            <LucideDelete size={18} className="me-1" />
                            Delete
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <LucideDelete size={18} className="me-1" />
                              Reject
                            </button>
                            <button
                              className="btn btn-success ms-2"
                              onClick={() => handleAcceptRequest(product.id)}
                            >
                              <ArrowRightIcon size={18} className="me-1" />
                              Accept
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <AddProductModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddProduct={handleAddProduct}
          isDealer={true}
          dealerid={dealerid}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}

export default DealerDashboard;
