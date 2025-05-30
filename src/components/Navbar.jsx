import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Leaf, Sun, Sprout, Trees, Menu } from "lucide-react";
import MobileMenuPortal from "./MobileMenu";
import "../pages/LandingPage.css";
import "./Navbar.css";
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {isLoggedIn, handleLogout} = useContext(AuthContext);
  const sections = [
    { id: "home", label: "Homepage", icon: <Trees className="icon" />, link: "/" },
    { id: "about", label: "Forum", icon: <Sprout className="icon" />, link: "/forum" },
    { id: "profile", label: "Profile", icon: <Leaf className="icon" />, link: "/profile" },
    { id: "skills", label: "Our Garden", icon: <Sun className="icon" />, link: "/garden" },
    { id: "contact", label: "About us", icon: <Leaf className="icon" />, link: "/about" },
    { id: "signup", label: "Signup", icon: <Leaf className="icon" />, link: "/signup" },
   
  ];

  return (
    <header className="site-header">
      <div className="logo-container">
        <div className="logo-circle">
          <NavLink to="/">
          <Sprout className="logo-icon" />
          </NavLink>
        </div>
        <span className="logo-text">SOLARIS</span>
      </div>

      <nav className="desktop-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
          <Trees className="icon" />
          HomePage
        </NavLink>

        <NavLink
          to="/forum"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
          <Sprout className="icon" />
          Forums
        </NavLink>

        <NavLink
          to="/garden"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
          <Sun className="icon" />
          Our Garden
        </NavLink>
        
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
          <Leaf className="icon" />
          About us
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
          <Leaf className="icon" />
          Profile
        </NavLink>

        <NavLink to="/signup"
        onClick={handleLogout}
          
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
         {isLoggedIn ? (
        <>
          Logout
        </>
      ) : (
        <>
         Signup
        </>
      )}
        </NavLink>

        
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button"
        onClick={() => setMenuOpen(!menuOpen)} // Toggle menu visibility
      >
        <Menu className="menu-icon" />
      </button>

      

      {/* Mobile Menu Portal */}
      {menuOpen && (
        <MobileMenuPortal sections={sections} onClose={() => setMenuOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;
