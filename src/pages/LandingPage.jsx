import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { Sun, Sprout, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

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

  {/* Centered Content Block */}
  <div className="section-center-content">
    <h1 className="home-title">
      <span className="home-title-first">
        DISCOVER, GROW AND CONNECT.
      </span>
    </h1>
    <p className="home-description">
      YOUR GARDEN JOURNEY STARTS HERE. <Sprout className="button-icon" />
    </p>
  {/* Bottom Button */}
  <div className="section-button-container">
    
  </div>
    <div className="home-visual">
      <div className="orbit-container">
        <div className="orbit-glow"></div>
        <div className="orbit-outer">
          <div className="orbit-middle">
            <div className="orbit-inner">
            <p><button className="sun-button" onClick={handleRevealParallax}>
                <Sun className="sun-icon" />
            </button> </p>
            <span><p>Welcome</p></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Parallax Reveal Section */}
      {showParallax && (
        <div className="section garden-section parallax-reveal">
              <div className="page-directions">
                <div className="section-overlay"></div>
                  <div className="section-content">
                    <h1>CULTIVATE YOUR PASSION</h1>
                    <p>
                       FROM ROOTS TO RESULTS.
                    </p>      
            
            {/*Page Directions*/}
              <div className="orbit-middle orbit-random orbit-garden">
                <div className="orbit-inner">
                  <Link to="/garden">
                    <p>
                    <Leaf className="icon" />
                     Garden
                   </p>
                   </Link>
                </div>
              </div>

              <div className="orbit-middle orbit-random orbit-profile">
                <div className="orbit-inner">
                <Link to="/profile">
                  <p>
                    <Sun className="icon" />
                     Profile
                  </p>
                  </Link>
                </div>
              </div>

              <div className="orbit-middle orbit-random orbit-about">
                <div className="orbit-inner">
                <Link to="/about">
                  <p>
                     About Us
                  </p>
                  </Link>
                </div>
              </div>

              <div className="orbit-middle orbit-random orbit-forum">
                <div className="orbit-inner">
                <Link to="/forum">
                  <p>
                    <Sprout className="icon" />
                     Forum
                  </p>
                  </Link>
                </div>
              </div>
            </div>


               
            </div>

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
        )}
      </div>
    );
  };

  export default LandingPage;
