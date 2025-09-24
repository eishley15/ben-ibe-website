import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <img src="/benibe.png" alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/Feature" className="nav-link">
          Feature
        </Link>
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        <Link to="/contact" className="nav-link">
          Contact Us
        </Link>
      </div>

      <div className="navbar-actions">
        <Link to="/products" className="signup-btn">
          Buy Now
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
