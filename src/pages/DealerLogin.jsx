import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCog } from 'lucide-react';
import axios from 'axios';

function DealerLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '', location: '' });
  const [shopPhoto, setShopPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    setShopPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = isLogin ? 'http://localhost:8080/logindealer' : 'http://localhost:8080/registerdealer';

    try {
        let response;
        if (isLogin) {
            // ✅ Send JSON for login
            response = await axios.post(url, credentials, { 
                headers: { 'Content-Type': 'application/json' } 
            });
        } else {
            // ✅ Use FormData for registration
            const formData = new FormData();
            const dealerBlob = new Blob([JSON.stringify(credentials)], { type: "application/json" });
            formData.append("dealer", dealerBlob);
            if (shopPhoto) {
                formData.append("shopPhoto", shopPhoto);
            }
            response = await axios.post(url, formData);
        }

        if (isLogin) {
            const { dealerid } = response.data;
            localStorage.setItem('dealerid', dealerid);
            navigate('/dealer-dashboard', {
                state: { username: credentials.username, dealerid },
            });
        } else {
            alert('Registration successful! You can now log in.');
            setIsLogin(true);
        }
    } catch (error) {
        setError(error.response ? error.response.data : 'An error occurred.');
    }
};

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '2rem 0',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              padding: '2rem',
              transition: 'all 0.3s ease'
            }}>
              <div className="text-center mb-4">
                <div style={{
                  background: 'linear-gradient(135deg, rgb(23, 42, 165) 0%, rgb(114, 127, 190) 100%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: '0 4px 12px rgba(23, 42, 165, 0.2)'
                }}>
                  <UserCog size={40} color="white" />
                </div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '600',
                  color: '#333333',
                  marginBottom: '0.5rem'
                }}>
                  {isLogin ? 'Dealer Login' : 'Register'}
                </h2>
              </div>

              {error && (
                <div style={{
                  background: '#fff1f2',
                  color: '#e11d48',
                  padding: '1rem',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        style={{
                          height: '3.5rem',
                          borderRadius: '10px',
                          border: '2px solid #e2e8f0',
                          padding: '1.5rem 0.75rem 0.5rem'
                        }}
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        required
                      />
                      <label htmlFor="email">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="Enter your location"
                        style={{
                          height: '3.5rem',
                          borderRadius: '10px',
                          border: '2px solid #e2e8f0',
                          padding: '1.5rem 0.75rem 0.5rem'
                        }}
                        value={credentials.location}
                        onChange={(e) => setCredentials({ ...credentials, location: e.target.value })}
                        required
                      />
                      <label htmlFor="location">Location</label>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                        Shop Photo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handlePhotoChange}
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e2e8f0',
                          padding: '0.75rem',
                          fontSize: '0.875rem'
                        }}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    style={{
                      height: '3.5rem',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      padding: '1.5rem 0.75rem 0.5rem'
                    }}
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    style={{
                      height: '3.5rem',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      padding: '1.5rem 0.75rem 0.5rem'
                    }}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, rgb(27, 65, 171) 0%, rgb(114, 127, 190) 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '1rem',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(27, 65, 171, 0.2)'
                  }}
                  className="mb-3"
                  onMouseOver={e => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(27, 65, 171, 0.3)';
                  }}
                  onMouseOut={e => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(27, 65, 171, 0.2)';
                  }}
                >
                  {isLogin ? 'Login' : 'Register'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '2px solid rgb(27, 65, 171)',
                    borderRadius: '10px',
                    padding: '1rem',
                    color: 'rgb(27, 65, 171)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => {
                    e.target.style.background = 'rgb(27, 65, 171)';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={e => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'rgb(27, 65, 171)';
                  }}
                >
                  {isLogin ? 'New user? Register here' : 'Already have an account? Login here'}
                </button>

                <style>{`
                  .form-floating > .form-control::placeholder {
                    color: transparent;
                  }
                  
                  .form-floating > .form-control:focus,
                  .form-floating > .form-control:not(:placeholder-shown) {
                    padding-top: 1.625rem;
                    padding-bottom: 0.625rem;
                  }

                  .form-floating > label {
                    padding: 0.75rem;
                    color: #64748b;
                  }

                  .form-floating > .form-control:focus ~ label,
                  .form-floating > .form-control:not(:placeholder-shown) ~ label {
                    transform: scale(0.85) translateY(-0.75rem);
                    color: rgb(27, 65, 171);
                  }

                  .form-control:focus {
                    border-color: rgb(27, 65, 171) !important;
                    box-shadow: 0 0 0 0.2rem rgba(27, 65, 171, 0.25) !important;
                  }
                `}</style>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealerLogin;