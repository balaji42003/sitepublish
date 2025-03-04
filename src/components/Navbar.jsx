import React from 'react';
import '../Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, LogOut, Mail, Home, Info, Settings, ShoppingBasket, RecycleIcon } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div className="container">
        {/* Brand Logo and Name */}
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/"
          style={{
            fontSize: '1.4rem',
            padding: '0.5rem 0'
          }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '0.5rem',
            borderRadius: '8px',
            marginRight: '0.75rem'
          }}>
            <RecycleIcon size={24} />
          </div>
          <span className="fw-bold">Recycle Connect</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            padding: '0.5rem',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.1)'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex mx-auto" style={{ maxWidth: '400px' }}>
            <div className="input-group">
              <input
                className="form-control border-0 bg-light"
                type="search"
                placeholder="Search for products..."
                aria-label="Search"
                style={{
                  borderRadius: '50px 0 0 50px',
                  padding: '0.625rem 1.25rem'
                }}
              />
              <button 
                className="btn btn-light px-3"
                type="submit"
                style={{ borderRadius: '0 50px 50px 0' }}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-1">
              <Link 
                className="nav-link px-3 py-2 d-flex align-items-center"
                to="/"
                style={{
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                <Home size={18} className="me-2" />
                Home
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link 
                className="nav-link px-3 py-2 d-flex align-items-center"
                to="/about-us"
                style={{
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                <Info size={18} className="me-2" />
                About
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link 
                className="nav-link px-3 py-2 d-flex align-items-center"
                to="/contact-us"
                style={{
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                <Mail size={18} className="me-2" />
                Contact
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item ms-2">
                  <Link 
                    className="btn btn-outline-light px-3 py-2"
                    to="/dealer-login"
                    style={{
                      borderRadius: '50px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Dealer Login
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link 
                    className="btn btn-light px-3 py-2"
                    to="/customer-login"
                    style={{
                      borderRadius: '50px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Customer Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown mx-1">
                  <a
                    className="nav-link dropdown-toggle px-3 py-2 d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Settings size={18} className="me-2" />
                    Settings
                  </a>
                  <ul 
                    className="dropdown-menu dropdown-menu-end border-0 shadow-sm"
                    style={{ borderRadius: '12px', marginTop: '0.5rem' }}
                  >
                    <li>
                      <Link className="dropdown-item py-2" to="/profile">
                        <i className="bi bi-person me-2"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/settings">
                        <i className="bi bi-gear me-2"></i>Account Settings
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item ms-2">
                  <button
                    className="btn btn-outline-light px-3 py-2 d-flex align-items-center"
                    onClick={handleLogout}
                    style={{
                      borderRadius: '50px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <LogOut size={18} className="me-2" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;