import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import './ContactUs.css'; // Import the CSS file for animations

function ContactUs() {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <h1 className="display-2 text-white fw-bold mb-4" style={{ letterSpacing: '-1px' }}>
            Contact Us
          </h1>
          <p className="lead text-white mb-5" style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
            Have questions or want to learn more about our services? Contact us today and our team will be happy to assist you.
          </p>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="container py-6">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg h-100 contact-card">
              <div className="card-body text-center p-5">
                <div className="icon-container">
                  <MapPin size={40} className="text-success" />
                </div>
                <h3 className="h4 mb-3">Our Address</h3>
                <p className="text-muted mb-0">
                  123 Green Street, Eco City, 12345
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg h-100 contact-card">
              <div className="card-body text-center p-5">
                <div className="icon-container">
                  <Phone size={40} className="text-success" />
                </div>
                <h3 className="h4 mb-3">Call Us</h3>
                <p className="text-muted mb-0">
                  +1 (234) 567-8900
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg h-100 contact-card">
              <div className="card-body text-center p-5">
                <div className="icon-container">
                  <Mail size={40} className="text-success" />
                </div>
                <h3 className="h4 mb-3">Email Us</h3>
                <p className="text-muted mb-0">
                  info@recycleconnect.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="card-body p-5">
                <h3 className="h4 mb-4 text-center">Send Us a Message</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="5" required></textarea>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg" style={{
                      padding: '1rem 2rem',
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#4CAF50',
                      border: 'none'
                    }}>
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

