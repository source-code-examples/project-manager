import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app_footer">
      <p>© 2025 My Project Board – All rights reserved.</p>
      <div className="footer_links">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Privacy</a>
      </div>
    </footer>
  );
};

export default Footer;
