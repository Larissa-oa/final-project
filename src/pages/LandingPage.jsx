import React, { useState, useEffect } from "react";
import { Sun, Sprout } from "lucide-react";
import "./LandingPage.css"
import arrowdown from "../assets/images/arrowdown.png"
import plantbot from "../assets/images/plantbot.png"
import plantpic from "../assets/images/plantpic-1.avif"
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [floatingElements, setFloatingElements] = useState([]);
  const [showParallax, setShowParallax] = useState(false);

  // Monitor scroll and hide parallax if at top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY < 50 && showParallax) {
        setShowParallax(false);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showParallax]);

  // Add floating elements on interval
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingElements((prev) =>
        prev.length < 20
          ? [
              ...prev,
              {
                id: Math.random(),
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 6 + 3,
                type: Math.random() > 0.5 ? "leaf" : "light",
              },
            ]
          : prev.slice(1)
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`app-container ${showParallax ? "parallax-active" : ""}`}>
      {/* Floating elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`floating-element ${element.type === "leaf" ? "leaf-element" : "light-element"}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            boxShadow:
              element.type === "leaf"
                ? `0 0 ${element.size * 2}px ${element.size}px rgba(52, 211, 153, 0.2)`
                : `0 0 ${element.size * 2}px ${element.size}px rgba(251, 191, 36, 0.2)`,
          }}
        />
      ))}

      {/* Home Section */}
      {!showParallax && (
        <div className="section home-section">
          <div className="section-overlay"></div>
          <div className="section-content">
            <h1 className="home-title">
              <span id="home-title-first">Solaris</span>
            </h1>
            <p className="home-description">
            Explore, learn, and connect with fellow plant lovers. Grow your knowledge and your garden in our vibrant community.<Sprout className="button-icon" />
            </p>
            <button className="primary-button" onClick={() => setShowParallax(true)}>
              <img src={arrowdown} style={{width:"45px", height:"70px", borderRadiius:"50%"}} />
            </button>
          </div>
          <div className="home-visual">
            <div className="orbit-container">
              <div className="orbit-glow"></div>
              <div className="orbit-outer">
                <div className="orbit-middle">
                  <div className="orbit-inner">
                    <Sun className="sun-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Parallax Reveal Section */}
      {showParallax && (
        <div className="section garden-section parallax-reveal">
          {/* Spacer to enable scroll */}
          <div style={{ height: "150vh" }}></div>

          <div className="section-overlay"></div>
          <div className="section-content">
  <div className="features-ad-wrapper">
    {/* Left: Features */}
    <div className="features-container">
      <div className="feature-row left">
        <Link to="/forum" className="link-info">
          <div className="feature-text">
            <h3>Our Forum</h3>
            <p>Join the community, share ideas, and grow together with other eco-tech lovers.</p>
          </div>
        </Link>
      </div>

      <div className="feature-row right">
        <Link to="/garden" className="link-info">
          <div className="feature-text">
            <h3>My Garden</h3>
            <p>Track your digital garden’s evolution, save your favorite discoveries, and plant new concepts.</p>
          </div>
        </Link>
      </div>

      <div className="feature-row left">
        <Link to="/login" className="link-info">
          <div className="feature-text">
            <h3>PlantBot</h3>
            <p>Your nature-loving AI companion — ask it anything about your garden or the digital ecosystem.</p>
          </div>
        </Link>
      </div>

      <div className="feature-row right">
        <div className="feature-text login-prompt">
          <h3>Log In to Explore</h3>
          <p>Get access to your garden and connect with PlantBot.</p>
          <Link to="/login" className="link-info">
            <button className="login-button">Log In</button>
          </Link>
        </div>
      </div>
    </div>


    
  </div>

 
</div>
    <div className="plantbot-img-container">
    <img src={plantbot} className="plantbot-image"/>
    </div>
            {/* Floating elements inside parallax */}
            <div className="floating-wrapper parallax-floating">
              {floatingElements.map((element) => (
                <div
                  key={element.id}
                  className={`floating-element ${element.type === "leaf" ? "leaf-element" : "light-element"} show-parallax`}
                  style={{
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                    width: `${element.size}px`,
                    height: `${element.size}px`,
                    opacity: 0.6,
                    transform: `scale(0.7)`,
                    boxShadow:
                      element.type === "leaf"
                        ? `0 0 ${element.size * 2}px ${element.size}px rgba(52, 211, 153, 0.2)`
                        : `0 0 ${element.size * 2}px ${element.size}px rgba(251, 191, 36, 0.2)`,
                  }}
                />
              ))}
            </div>
          </div>
      )}
    </div>
  );
};

export default LandingPage;
