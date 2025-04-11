import React from 'react'
import "../components/LandingTemplate.css"
import { useState, useEffect } from "react";
import { Sun, Sprout } from "lucide-react";

const LandingPage = () => {
  const [floatingElements, setFloatingElements] = useState([]);

  // Create floating nature elements
  useEffect(() => {
    const interval = setInterval(() => {
      if (floatingElements.length < 12) {
        setFloatingElements((prev) => [
          ...prev,
          {
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 3,
            type: Math.random() > 0.5 ? "leaf" : "light",
          },
        ]);
      } else {
        setFloatingElements((prev) => prev.slice(1));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [floatingElements.length]);

  return (
    <div className="app-container">
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
      <div className="section home-section">
        <div className="section-overlay"></div>
        <div className="section-content">
          <h1 className="home-title">
            <span className="home-title-first">Solar</span>
            <span className="home-title-second">Artificer</span>
          </h1>
          <p className="home-description">
            Crafting sustainable digital gardens where technology blooms in harmony with nature. Building bridges
            between the virtual and natural worlds.
          </p>
          <button className="primary-button">
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
    </div>
  );
}

export default LandingPage
