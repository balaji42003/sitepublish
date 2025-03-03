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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow border-primary">
            <div className="card-body">
              <div className="text-center mb-4">
                <UserCog size={48} className="text-primary" />
                <h2 className="mt-3">{isLogin ? 'Dealer Login' : 'Register'}</h2>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={credentials.location}
                        onChange={(e) => setCredentials({ ...credentials, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Shop Photo</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handlePhotoChange}
                        required
                      />
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {isLogin ? 'Login' : 'Register'}
                </button>
              </form>
              <div className="text-center mt-3">
                <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'New user? Register here' : 'Already have an account? Login here'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealerLogin;