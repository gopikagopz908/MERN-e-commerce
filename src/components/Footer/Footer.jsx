import React from 'react';
// Importing icons from react-icons
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">About ShoeZone</h5>
            <p className="small">
              ShoeZone brings you the finest collection of footwear for all occasions. Whether you want casual, formal, or sportswear, our premium designs combine comfort with style.
            </p>
          </div>

          {/* Shoe Categories */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Shoe Categories</h5>
            <p className="small mb-1">Men's Shoes</p>
            <p className="small mb-1">Women's Shoes</p>
            <p className="small mb-1">Kids' Shoes</p>
            <p className="small mb-1">Athletic Footwear</p>
            <p className="small mb-1">Winter Boots</p>
          </div>

          {/* Shoe Care Tips */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Shoe Care Tips</h5>
            <p className="small mb-1">- Clean regularly with a soft cloth or brush.</p>
            <p className="small mb-1">- Use a shoe protector spray to guard against stains.</p>
            <p className="small mb-1">- Avoid exposure to extreme heat or moisture.</p>
            <p className="small mb-1">- Rotate your shoes to reduce wear and tear.</p>
          </div>

          {/* Social Media & Support */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Connect with Us</h5>
            <div className="d-flex align-items-center mb-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="me-2" />
              </a>
              <p className="small mb-0">Facebook</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="me-2" />
              </a>
              <p className="small mb-0">Instagram</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="me-2" />
              </a>
              <p className="small mb-0">Twitter</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="me-2" />
              </a>
              <p className="small mb-0">YouTube</p>
            </div>
            <h5 className="text-uppercase mt-4">Customer Support</h5>
            <p className="small mb-1">Email: support@shoezone.com</p>
            <p className="small mb-1">Phone: +123 456 7890</p>
          </div>
        </div>

        <hr className="border-light" />
        <div className="text-center">
          <p className="mb-0 small">&copy; 2024 ShoeZone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
