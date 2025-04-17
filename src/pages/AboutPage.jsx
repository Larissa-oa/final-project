import React from 'react';
import { Send } from "lucide-react";
import "./AboutPage.css";
import "./LandingPage.css";
import git from "../assets/images/github.png";
import link from "../assets/images/linkedin.png";
import larissa from "../assets/images/larissa.jpg"
import joao from "../assets/images/Joao.jpg"

const AboutPage = () => {
  return (
    <div>
      <div className="section contact-section">
        <div className="section-overlay"></div>
        <div className="section-content">
          <h2 className="section-title">About us</h2>
          <div className="contact-info">
            <p className="contact-intro">
             Hello, we are Larissa and João! the plant-loving founders of Solaris. We created this app to make plant care a breeze and connect fellow plant enthusiasts 🌱 Join us on this green journey, and reach out through our LinkedIn or GitHub if you want to learn more about us and our other projects.
            </p>
           
            <h3><img src={larissa} className="about-us-pic"/>Larissa Almeida </h3> 
            <div className="contact-method">
              <a href="https://github.com/Larissa-oa" target="_blank" rel="noopener noreferrer">
                <img className="contact-method-title" src={git} alt="GitHub" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
              </a>
              <a href="https://www.linkedin.com/in/larissa-almeida-2a8370253/" target="_blank" rel="noopener noreferrer">
                <img className="contact-method-value" src={link} alt="LinkedIn" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
              </a>
            </div>

            <h3><img src={joao}  className="about-us-pic"/>João Jacinto</h3>
            <div className="contact-method">
            
              <a href="https://github.com/joaommj" target="_blank" rel="noopener noreferrer">
                <img className="contact-method-title" src={git} alt="GitHub" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
              </a>
              <a href="https://www.linkedin.com/in/jo%C3%A3o-jacinto-984b663b/" target="_blank" rel="noopener noreferrer">
                <img className="contact-method-value" src={link} alt="LinkedIn" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-visual">
          <div className="contact-orbit-container">
            <div className="contact-orbit-glow"></div>
            <div className="contact-orbit-outer">
              <div className="contact-orbit-inner">
                <Send className="contact-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
