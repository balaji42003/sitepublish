import React, { useState, useEffect } from 'react';
import { CheckCircle, Inbox, Package, ShoppingBag, LucideDelete, ArrowRightIcon, LogOutIcon } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';
import axios from 'axios';
import '../DealerDashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';

function DealerDashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [collectedItems, setCollectedItems] = useState([]);
  const [recieved, setRecieved] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [viewCustomerProducts, setViewCustomerProducts] = useState(false);
  const [viewCollectedItems, setViewCollectedItems] = useState(false);
  const [dealerInfo, setDealerInfo] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const toggleCollectedItemsView = () => {
    setViewCollectedItems((prev) => !prev);
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
      setRecieved((prev) => prev + 1); // Increment the count of recovered items
      setRefresh(!refresh); // Trigger refresh to update the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle accepting a customer request
  const handleAcceptRequest = (product) => {
    // Update the product status to 'Accepted'
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id)
    );

    // Add the product to collected items
    setCollectedItems((prevItems) => [...prevItems, { ...product, status: 'Accepted' }]);

    // Increment the count of collected items
    setRecieved((prev) => prev + 1);
  };

  // Handle adding a new product (called from AddProductModal)
  const handleAddProduct = (newProduct) => {
    // Add the new product to the current list
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowAddModal(false); // Close the modal after successful product addition
    setRefresh((prev) => !prev); // Refresh the product list
  };

  // Handle image click to show modal
  const handleImageClick = (imageData, imageType) => {
    setSelectedImage(`data:${imageType};base64,${imageData}`);
    setShowImageModal(true);
  };

  // Handle deleting a collected item
  const handleDeleteCollectedItem = (productId) => {
    setCollectedItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    setRecieved((prev) => prev - 1);
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
                onClick={() => navigate('/sitepublish/')}
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
              <button
                className="btn w-100"
                onClick={toggleCollectedItemsView}
                style={{
                  background: 'white',
                  color: 'rgb(23, 42, 165)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: '2px solid rgb(23, 42, 165)'
                }}>
                <ShoppingBag size={18} className="me-2" />
                {viewCollectedItems ? "Hide Collected Items" : "See Collected Items"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6" style={{marginLeft:"80px", marginTop:"50px"}}>
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
            <h2 style={{ fontSize: '1.5rem', color: '#333333', marginBottom: 0 }}>{collectedItems.length}</h2>
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
          {viewCustomerProducts ? "Customer Requests" : viewCollectedItems ? "Collected Items" : "Your Products"}
        </h2>

        {viewCollectedItems ? (
          collectedItems.length === 0 ? (
            <div className="text-center py-5">
              <Package size={48} style={{ color: '#cbd5e1' }} className="mb-3" />
              <h4 style={{ color: '#333333' }}>No collected items available</h4>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '1rem' }}>Product Name</th>
                    <th style={{ padding: '1rem' }}>Type</th>
                    <th style={{ padding: '1rem' }}>Description</th>
                    <th style={{ padding: '1rem' }}>Expiry Date</th>
                    <th style={{ padding: '1rem' }}>Customer Name</th>
                    <th style={{ padding: '1rem' }}>Photo</th>
                    <th style={{ padding: '1rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {collectedItems.map((product, index) => (
                    <tr key={product.id || index}>
                      <td>{product.name}</td>
                      <td>{product.type}</td>
                      <td>{product.description}</td>
                      <td>{product.expiryDate}</td>
                      <td>{product.custname}</td>
                      <td>
                        {product.photoData ? (
                          <img
                            src={`data:${product.photoType};base64,${product.photoData}`}
                            alt={product.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
                            onClick={() => handleImageClick(product.photoData, product.photoType)}
                          />
                        ) : (
                          'No Photo'
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteCollectedItem(product.id)}
                        >
                          <LucideDelete size={18} className="me-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          products.length === 0 ? (
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
                    {viewCustomerProducts && <th style={{ padding: '1rem' }}>Photo</th>}
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
                      {viewCustomerProducts && (
                        <td>
                          {product.photoData ? (
                            <img
                              src={`data:${product.photoType};base64,${product.photoData}`}
                              alt={product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
                              onClick={() => handleImageClick(product.photoData, product.photoType)}
                            />
                          ) : (
                            'No Photo'
                          )}
                        </td>
                      )}
                      <td>
                        {!viewCustomerProducts ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteProduct(product.id)}
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
                              onClick={() => handleAcceptRequest(product)}
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
          )
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowImageModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '10px',
              padding: '1rem',
              maxWidth: '90%',
              maxHeight: '90%',
              overflow: 'auto'
            }}
          >
            <img
              src={selectedImage}
              alt="Enlarged"
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </div>
        </div>
      )}

      {/* Add Product Modal */}
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