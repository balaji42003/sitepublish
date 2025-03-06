import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecycleLogo from '../Recyclelogo.jpg'; // Import the image

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <style>
        {`
          @keyframes rotateClockwise {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes rotateEarth {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg , rgba(29, 84, 213, 0.6) 60%, rgba(17, 191, 40, 0.48) 20%)',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating Icons */}
        <div style={{ position: 'absolute', top: '100px', left: '40px', fontSize: '100px', color: 'green', border: 'none', animation: 'rotateClockwise 10s linear infinite' }}>
          ♻️
        </div>
        <div style={{ position: 'absolute', bottom: '30px', right: '50px', fontSize: '300px', color: 'white', animation: 'rotateEarth 20s linear infinite' }}>
          🌍
        </div>

        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <h1 className="display-3 text-white fw-bold mb-4" style={{ letterSpacing: '-1px' }}>
            About Us
          </h1>
          <p className="lead text-white mb-4" style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
            Learn more about our mission, vision, and the team behind Recycle Connect.
          </p>

          {/* Additional Content */}
          <p className="text-white mb-4" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Our goal is to make recycling accessible and effective for a greener future. Join us in making a difference!
          </p>

          {/* Call to Action Button */}
          <Link to={"/customer-login"}>
          <a className="btn btn-light fw-bold px-4 py-2 shadow">
            Get Involved
          </a>
          </Link>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="container py-6">
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="display-4 fw-bold mb-4">Our Mission</h2>
              <p className="lead mb-5" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                At Recycle Connect, our mission is to lead the way in sustainable e-waste management and recycling solutions. We aim to reduce the environmental impact of electronic waste by connecting individuals and businesses with certified recycling partners.
              </p>
            </motion.div>
          </div>
          <div className="col-lg-3 mt-5">
            <motion.img
              src="https://media.istockphoto.com/id/1201593468/vector/letter-e-logo-with-arrow-inside.jpg?s=612x612&w=0&k=20&c=u5QFIjDS4d0MgnRGesy5nLYIYAP7BGrijy1koNGLCaU="
              alt="Mission"
              className="img-fluid rounded-3 shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-lg-6 order-lg-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="display-4 fw-bold mb-4">Our Vision</h2>
              <p className="lead mb-5" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                Our vision is to create a world where electronic waste is managed responsibly, and valuable resources are recovered and reused. We strive to educate and empower communities to make informed decisions about e-waste disposal.
              </p>
            </motion.div>
          </div>
          <div className="col-lg-3 order-lg-1">
            <motion.img
              src="https://media.licdn.com/dms/image/v2/D5612AQEUNlLcQlUOSw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1672160389302?e=2147483647&v=beta&t=at84bk4VW_jRLZpm-sX3zcdRWzuriVnuo-blXo2gEL8"
              alt="Vision"
              className="img-fluid rounded-3 shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container py-6">
        <h2 className="display-4 fw-bold text-center mb-5">Meet Our Team</h2>
        <div className="row g-4">
          {[
            { name: 'Gandala Balaji', role: 'CEO' },
            { name: 'Maruthi kumar', role: 'CTO' },
            { name: 'Darshini', role: 'CFO' },
            { name: 'Ashraf', role: 'CFO' },
            { name: 'Madhan Kumar', role: 'COO' }
          ].map((member, index) => (
            <div className="col-md-3" key={index}>
              <motion.div
                className="card border-0 shadow-lg h-100 text-center"
                style={{ borderRadius: '15px', overflow: 'hidden' }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text text-muted">{member.role}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div style={{
        background: 'linear-gradient(135deg,rgb(24, 123, 223) 0%,rgb(142, 223, 181) 100%)',
        padding: '6rem 0',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white">
              <h2 className="display-4 fw-bold mb-4">Get in Touch</h2>
              <p className="lead mb-5" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                Have questions or want to learn more about our services? Contact us today and our team will be happy to assist you.
              </p>
              <Link 
                to="/contact-us" 
                className="btn btn-light btn-lg"
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Us
                <ArrowRight size={20} className="ms-2" />
              </Link>
            </div>
            <div className="col-lg-5 mt-5 mt-lg-0">
              <motion.img
                src={RecycleLogo}
                alt="contact-us"
                className="img-fluid rounded-3 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;