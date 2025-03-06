import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Battery, Cpu, Smartphone, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Section with Gradient Background */}
      <div className="position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(29, 84, 213, 0.6) 60%, rgba(17, 191, 40, 0.48) 20%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <h1 className="display-3 text-white fw-bold mb-4 animate__animated animate__fadeInDown" style={{ letterSpacing: '-1px' }}>
            Welcome to Recycle Connect
          </h1>
          <p className="lead text-white mb-5 animate__animated animate__fadeInUp" style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
            Join the revolution in e-waste management. Connect with certified dealers
            and contribute to a sustainable future.
          </p>
          <div className="d-flex justify-content-center gap-4">
            <Link 
              to="/customer-login" 
              className="btn btn-primary btn-lg animate__animated animate__zoomIn"
              style={{
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                backgroundColor: '#4CAF50',
                border: 'none'
              }}
            >
              Customer Portal
              <ArrowRight size={20} className="ms-2" />
            </Link>
            <Link 
              to="/dealer-login" 
              className="btn btn-outline-light btn-lg animate__animated animate__zoomIn"
              style={{
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
            >
              Dealer Portal
              <ArrowRight size={20} className="ms-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-6" style={{ marginTop: '-100px' }}>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100 animate__animated animate__fadeInUp" style={{
              borderRadius: '15px',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div className="card-body text-center p-5">
                <div style={{
                  background: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <Battery size={40} className="text-success" />
                </div>
                <h3 className="h4 mb-3">Responsible Disposal</h3>
                <p className="text-muted mb-0">
                  Ensure your e-waste is handled responsibly with our network of
                  certified recycling partners.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100 animate__animated animate__fadeInUp" style={{
              borderRadius: '15px',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              animationDelay: '0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div className="card-body text-center p-5">
                <div style={{
                  background: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <Cpu size={40} className="text-primary" />
                </div>
                <h3 className="h4 mb-3">Certified Dealers</h3>
                <p className="text-muted mb-0">
                  Connect with verified dealers who follow strict environmental
                  guidelines.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100 animate__animated animate__fadeInUp" style={{
              borderRadius: '15px',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              animationDelay: '0.4s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div className="card-body text-center p-5">
                <div style={{
                  background: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <Smartphone size={40} className="text-primary" />
                </div>
                <h3 className="h4 mb-3">Easy Process</h3>
                <p className="text-muted mb-0">
                  Simple and streamlined process to dispose of your electronic
                  waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="animate__animated animate__fadeIn" style={{
        background: 'linear-gradient(135deg,rgb(24, 123, 223) 0%,rgb(142, 223, 181) 100%)',
        padding: '6rem 0',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white">
              <h2 className="display-4 fw-bold mb-4">Join the E-Waste Revolution</h2>
              <p className="lead mb-5" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                Every year, millions of electronic devices end up in landfills.
                Together, we can make a difference by properly recycling e-waste
                and contributing to a sustainable future.
              </p>
              <Link 
                to="/customer-login" 
                className="btn btn-light btn-lg"
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started Today
                <ArrowRight size={20} className="ms-2" />
              </Link>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1550376026-33cbee34f79e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="E-waste recycling"
                className="img-fluid rounded-3 shadow-lg"
                style={{
                  transform: 'rotate(2deg)',
                  maxWidth: '90%'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;