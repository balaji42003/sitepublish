import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Youtube, RecycleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialIcons = [
    { Icon: Facebook, link: '#' },
    { Icon: Twitter, link: '#' },
    { Icon: Instagram, link: '#' },
    { Icon: Github, link: '#' },
    { Icon: Youtube, link: '#' }
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, rgb(23, 42, 165, 0.95) 0%, rgb(114, 127, 190, 0.95) 100%)',
      color: 'white',
      padding: '4rem 0 1rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4">
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <RecycleIcon size={32} style={{ marginRight: '10px' }} />
                <h3 className="mb-0">Recycle Connect</h3>
              </div>
              <p style={{ opacity: 0.8 }}>
                Leading the way in sustainable e-waste management and recycling solutions.
                Together for a greener future.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled" style={{ opacity: 0.8 }}>
              <li className="mb-2">
                <Link to="/sitepublish" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact-us" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled" style={{ opacity: 0.8 }}>
              <li className="mb-2 d-flex align-items-center">
                <MapPin size={18} style={{ marginRight: '10px' }} />
                123 Green Street, Eco City, 12345
              </li>
              <li className="mb-2 d-flex align-items-center">
                <Phone size={18} style={{ marginRight: '10px' }} />
                +91 6303890919
                +91 6304565953
              </li>
              <li className="mb-2 d-flex align-items-center">
                <Mail size={18} style={{ marginRight: '10px' }} />
                maruthikumar244@gmail.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3">
            <h5 className="mb-3">Newsletter</h5>
            <p style={{ opacity: 0.8 }}>Subscribe to our newsletter for updates and tips.</p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '8px 0 0 8px'
                }}
              />
              <button 
                className="btn btn-light" 
                type="button"
                style={{ borderRadius: '0 8px 8px 0' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="d-flex justify-content-center gap-3 mb-4">
              {socialIcons.map(({ Icon, link }, index) => (
                <a 
                  key={index}
                  href={link}
                  className="btn btn-light btn-sm rounded-circle"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={20} color="rgb(23, 42, 165)" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="row mt-4">
          <div className="col-12">
            <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <div className="d-flex flex-wrap justify-content-between align-items-center" style={{ opacity: 0.8 }}>
              <p className="mb-0">© 2025 Recycle Connect. All rights reserved.</p>
              <div>
                <Link to="/privacy" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                  Privacy Policy
                </Link>
                <Link to="/terms" style={{ color: 'white', textDecoration: 'none' }}>
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;