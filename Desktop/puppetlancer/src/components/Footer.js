import React from 'react';
import './Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="/">Terms of Service</a>
        <a href="/">Privacy Policy</a>
        <a href="/">Help</a>
        <a href="/">About</a>
        <a id='custom-link' href="https://kitchen.co/">Custom Work</a>
      </div>
      <div className="footer-social">
        <a href='/'><img src="/images/twitter.png" alt="Twitter" /></a>
        <a href='/'><img src="/images/linkedin.png" alt="LinkedIn" /></a>
        <a href='/'><img src="/images/insta.png" alt="Instagram" /></a>
        <a href='/'><img src="/images/fb.png" alt="Facebook" /></a>
        {/* <a href='/'><img src="/path-to-gmail-logo" alt="Gmail" /> */}
      </div>
    </footer>
  );
};

export default Footer;
