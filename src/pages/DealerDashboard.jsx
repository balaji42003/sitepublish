import React, { useState, useEffect } from 'react';
import { Briefcase, CheckCircle, Inbox, Package, ShoppingBag, UserCheck2Icon, LucideDelete, ArrowRightIcon, LogOut, LogOutIcon } from 'lucide-react';
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
    console.log(dealerid, username);
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

  const increment = () => {
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
    <div className="dashboard-container" style={{ padding: '2rem' }}>
      {/* Header Section */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            height: '100%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <div className="dealer-info mb-4 d-flex justify-content-between align-items-start">
              <div>
                <h1 style={{
                  color: '#333333',
                  fontSize: '2.5rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>{username}</h1>
                <p style={{
                  color: '#64748b',
                  fontSize: '1.1rem',
                  margin: 0
                }}>{dealerInfo?.location}</p>
              </div>
              
              <button
                onClick={() => navigate('/')}
                style={{
                  background: 'transparent',
                  border: '2px solid #dc3545',
                  color: '#dc3545',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={e => {
                  e.target.style.background = '#dc3545';
                  e.target.style.color = 'white';
                }}
                onMouseOut={e => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#dc3545';
                }}
              >
                <LogOutIcon size={18} />
                Logout
              </button>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column gap-3">
              <button
                className="btn w-100"
                onClick={toggleView}
                style={{
                  background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(23, 42, 165, 0.2)'
                }}>
                <CheckCircle size={18} className="me-2" />
                {viewCustomerProducts ? "Show Dealer Products" : "Approve Requests"}
              </button>
              <button
                className="btn w-100"
                onClick={handleSellItemClick}
                style={{
                  background: 'white',
                  color: 'rgb(23, 42, 165)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: '2px solid rgb(23, 42, 165)'
                }}>
                <Package size={18} className="me-2" />
                Upload Product
              </button>
              <button
                className="btn w-100"
                onClick={() => setShowAddModal(true)}
                style={{
                  background: 'white',
                  color: 'rgb(23, 42, 165)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: '2px solid rgb(23, 42, 165)'
                }}>
                <Package size={18} className="me-2" />
                Sell Item
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4" style={{marginLeft:"150px", marginTop:"50px"}}>
  <div className="ms-4" style={{
    height: '400px',  // Defined a max height for consistency
    width: '800px',  
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  // Centers image inside the div
    background: '#f4f4f4'  // Light background to avoid blank spaces
  }}>
    <img
      src={dealerInfo?.shopPhotoData 
        ? `data:${dealerInfo.shopPhotoType};base64,${dealerInfo.shopPhotoData}` 
        : 'https://via.placeholder.com/300'}  // Fallback image
      alt="Shop"
      style={{
        Width: '100%',  
        Height: '100%',  
        objectFit: 'contain',  // Keeps the full image visible without cropping
        borderRadius: '20px'
      }}
    />
  </div>
</div>

      </div>

      {/* Stats Section */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Package size={24} style={{ color: 'rgb(23, 42, 165)' }} />
            <h3 style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>Products Listed</h3>
            <h2 style={{ fontSize: '1.5rem', color: '#333333', marginBottom: 0 }}>{products.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Inbox size={24} style={{ color: 'rgb(23, 42, 165)' }} />
            <h3 style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>Recovered Items</h3>
            <h2 style={{ fontSize: '1.5rem', color: '#333333', marginBottom: 0 }}>{recieved}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <ShoppingBag size={24} style={{ color: 'rgb(23, 42, 165)' }} />
            <h3 style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>Collected Items</h3>
            <h2 style={{ fontSize: '1.5rem', color: '#333333', marginBottom: 0 }}>0</h2>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ marginBottom: '2rem', color: '#333333' }}>
          {viewCustomerProducts ? "Customer Requests" : "Your Products"}
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-5">
            <Package size={48} style={{ color: '#cbd5e1' }} className="mb-3" />
            <h4 style={{ color: '#333333' }}>No products available</h4>
            <p style={{ color: '#64748b' }}>
              {viewCustomerProducts
                ? "No customer requests at the moment."
                : "Click the 'Sell Item' button to list your first product."}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '1rem' }}>Product Name</th>
                  <th style={{ padding: '1rem' }}>Type</th>
                  <th style={{ padding: '1rem' }}>{viewCustomerProducts ? "Description" : "Price"}</th>
                  <th style={{ padding: '1rem' }}>Expiry Date</th>
                  <th style={{ padding: '1rem' }}>{viewCustomerProducts ? "Customer Name" : "Description"}</th>
                  <th style={{ padding: '1rem' }}>Action</th>
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
