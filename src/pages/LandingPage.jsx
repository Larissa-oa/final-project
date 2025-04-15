import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { Sun, Sprout } from "lucide-react";

const LandingPage = () => {
  const [floatingElements, setFloatingElements] = useState([]);
  const [showParallax, setShowParallax] = useState(false);

/*template of parallax to diactivate it when scoll to top. not working*/ 
  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY === 0) {
      setShowParallax(false);  
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleRevealParallax = () => {
    setShowParallax(true); 
  };

  return (
    <div className="app-container">
      {/* Floating elements */}
      <div className={`floating-wrapper ${showParallax ? "parallax-active" : ""}`}>
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className={`floating-element ${
              element.type === "leaf" ? "leaf-element" : "light-element"
            } ${showParallax ? "show-parallax" : ""}`} // Add the show-parallax class based on the state
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              opacity: showParallax ? 0.6 : 0.4, 
              transform: `scale(${showParallax ? 0.7 : 0.5})`, 
              boxShadow:
                element.type === "leaf"
                  ? `0 0 ${element.size * 2}px ${element.size}px rgba(52, 211, 153, 0.2)`
                  : `0 0 ${element.size * 2}px ${element.size}px rgba(251, 191, 36, 0.2)`,
            }}
          />
        ))}
      </div>

      {/* Home Section */}
      <div className="section home-section">
        <div className="section-overlay"></div>
        <div className="section-content">
          <h1 className="home-title">
            <span className="home-title-first">Solar</span>
            <span className="home-title-second">Artificer</span>
          </h1>
          <p className="home-description">
            Crafting sustainable digital gardens where technology blooms in harmony with nature.
          </p>
          <button className="primary-button" onClick={handleRevealParallax}>
            Explore My Garden <Sprout className="button-icon" />
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

      {/* Parallax Reveal Section */}
      {showParallax && (
        <div className="section garden-section parallax-reveal">
          <div className="section-overlay"></div>
          <div className="section-content">
            <h2>WRITE HERE WHAT COMES AFTER PARALLAX </h2>
            <p>
              BLABLABLA
            </p>
            {/* Floating elements inside the parallax section --Slightly more and less opacity*/}
            <div className="floating-wrapper parallax-floating">
              {floatingElements.map((element) => (
                <div
                  key={element.id}
                  className={`floating-element ${
                    element.type === "leaf" ? "leaf-element" : "light-element"
                  } show-parallax`} 
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
        </div>
      )}
    </div>
  );
};

export default LandingPage;
