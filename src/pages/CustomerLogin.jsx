import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import axios from 'axios';

function CustomerLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const url = isLogin ? 'http://localhost:8080/login' : 'http://localhost:8080/register';

    try {
      const response = await axios.post(url, credentials);

      if (isLogin) {
        const { id } = response.data; // Extract user ID

        // Navigate to dashboard with username and ID
        navigate('/customer-dashboard', { 
          state: { 
            username: credentials.username, 
            id: id 
          } 
        });

        console.log('Navigated with username:', credentials.username, 'and ID:', id);
      } else {
        alert('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.response?.data || 'An error occurred. Please try again.');
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
                  <User size={40} color="white" />
                </div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '600',
                  color: '#333333',
                  marginBottom: '0.5rem'
                }}>
                  {isLogin ? 'Customer Login' : 'Register'}
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
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email address"
                      style={{
                        height: '3rem',
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        padding: '0 1rem',
                        fontSize: '1rem'
                      }}
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    style={{
                      height: '3rem',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      padding: '0 1rem',
                      fontSize: '1rem'
                    }}
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    style={{
                      height: '3rem',
                      borderRadius: '10px',
                      border: '2px solid #e2e8f0',
                      padding: '0 1rem',
                      fontSize: '1rem'
                    }}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, rgb(27, 65, 171) 0%, #2E7D32 100%)',
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
                  .form-control::placeholder {
                    color: #94a3b8;
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

export default CustomerLogin;
