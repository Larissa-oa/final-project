import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Leaf, Sun, Sprout, Trees } from "lucide-react";
import "../pages/LandingPage.css";
import "./Navbar.css"

const Navbar = () => {
  return (
    <header className="site-header">
      <div className="logo-container">
        <div className="logo-circle">
          <Sprout className="logo-icon" />
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
          Sanctuary
        </NavLink>

        <NavLink
          to="/forum"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
          <Sprout className="icon" />
          Journey
        </NavLink>

        <NavLink
          to="/garden"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
          <Sun className="icon" />
          Cultivation
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : ""}`
          }
        >
          <Leaf className="icon" />
          Connect
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
