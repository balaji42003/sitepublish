import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plus, Recycle, ShoppingBasket, User, ShoppingCart, LogOutIcon } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function CustomerDashboard({ cart = [], addToCart, updateQuantity, removeFromCart, clearCart }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [crefresh, setCrefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const id = location.state?.id;

  // Function to fetch customer products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getcustomerproduct/${id}`);
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${id}`);
      if (response.data && Array.isArray(response.data)) {
        clearCart?.(); // Clear existing cart items first
        response.data.forEach(item => addToCart?.(item));
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleNavigate = () => {
    navigate("/view", { state: { id, username } });
  };

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    navigate('/customer-login');
  };

  // Check for authentication
  useEffect(() => {
    if (!username || !id) {
      navigate('/customer-login');
      return;
    }
  }, [username, id, navigate]);

  // Fetch data when the component loads
  useEffect(() => {
    if (username && id) {
      fetchProducts();
      fetchCartItems();
    }
  }, [username, id, crefresh]); // Added proper dependencies

  const handleAddProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, { ...product, id: Date.now() }]);
  };

  if (loading) {
    return <div className="container py-5">Loading...</div>;
  }

  if (error) {
    return <div className="container py-5">Error: {error}</div>;
  }

  return (
    <div className="dashboard-container bg-light min-vh-100">
      {/* Hero Section with Gradient Background */}
      <div 
        className="position-relative rounded-bottom shadow-lg mb-4"
        style={{
          background: 'linear-gradient(135deg,rgb(89, 96, 246) 0%,rgb(0, 255, 98) 100%)',
          height: '25vh',
          marginBottom: '-50px'
        }}
      >
        <div className="position-absolute w-100 h-100 top-0 start-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))',
            borderRadius: 'inherit'
          }}>
          <div className="container h-100">
            <div className="d-flex align-items-center h-100 text-white">
              <div>
                <div className="d-flex align-items-center mb-2">
                  <User size={48} className="me-3" />
                  <h1 className="display-4 fw-bold mb-0">Welcome back, {username}!</h1>
                </div>
                <p className="lead opacity-75 mb-0">Manage your products and orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container position-relative">
        {/* Action Buttons */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex flex-wrap gap-3">
                  <button 
                    className="btn btn-primary btn-lg hover-scale"
                    onClick={() => setShowAddModal(true)}
                  >
                    <Plus size={20} className="me-2" />
                    Resell Product
                  </button>
                  <button 
                    className="btn btn-success btn-lg hover-scale"
                    onClick={handleNavigate}
                  >
                    <ShoppingBasket size={20} className="me-2" />
                    Browse Products
                  </button>
                  <Link 
                    to="/cart" 
                    state={{ id, username }} 
                    className="btn btn-info btn-lg text-white hover-scale"
                  >
                    <ShoppingCart size={20} className="me-2" />
                    Cart ({cart?.length || 0})
                  </Link>
                  <Link 
                    to="/my-orders" 
                    state={{ id, username }} 
                    className="btn btn-secondary btn-lg hover-scale"
                  >
                    <Package size={20} className="me-2" />
                    My Orders
                  </Link>
                  <button
                    className="btn btn-danger btn-lg hover-scale"
                    onClick={handleLogout}
                    style={{
                      background: 'transparent',
                      border: '2px solid #dc3545',
                      color: '#dc3545',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
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
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm hover-lift bg-white h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded-circle bg-primary bg-opacity-10 me-3">
                    <Package size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="h5 mb-1">Products Listed</h3>
                    <h2 className="display-6 fw-bold text-primary mb-0">{products.length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm hover-lift bg-white h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded-circle bg-success bg-opacity-10 me-3">
                    <Recycle size={24} className="text-success" />
                  </div>
                  <div>
                    <h3 className="h5 mb-1">Items Approved</h3>
                    <h2 className="display-6 fw-bold text-success mb-0">0</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white p-4 border-bottom">
            <h3 className="mb-0">My Products</h3>
          </div>
          <div className="card-body p-4">
            {products.length === 0 ? (
              <div className="text-center py-5">
                <div className="p-3 rounded-circle bg-light d-inline-flex mb-4">
                  <Package size={48} className="text-muted" />
                </div>
                <h4 className="mb-2">No products listed yet</h4>
                <p className="text-muted mb-4">
                  Click the "Resell Product" button to list your first product for recycling.
                </p>
                <button 
                  className="btn btn-primary btn-lg hover-scale"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus size={20} className="me-2" />
                  Add Product
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0">Product Name</th>
                      <th className="border-0">Type</th>
                      <th className="border-0">Expired Date</th>
                      <th className="border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="fw-medium">{product.name}</td>
                        <td>{product.type}</td>
                        <td>{product.expiryDate}</td>
                        <td>
                          <span className={`badge ${
                            product.status === 'Approved' 
                              ? 'bg-success' 
                              : 'bg-warning'
                          }`}>
                            {product.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <AddProductModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
          isDealer={false}
          customerId={id}
          customerName={username}
          setCrefresh={setCrefresh}
        />
      </div>
    </div>
  );
}

export default CustomerDashboard;