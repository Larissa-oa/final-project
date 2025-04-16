import React from 'react'
import { Send } from "lucide-react";
import "./AboutPage.css"
import "./LandingPage.css"
import git from "../assets/images/github.png"
import link from "../assets/images/linkedin.png"

const AboutPage = () => {
  return (
    <div>
       <div className="section contact-section">
    <div className="section-overlay"></div>
    <div className="section-content">
      <h2 className="section-title">About us </h2>
      <div className="contact-info">
        <p className="contact-intro">
        Larissa and João, the plant-loving founders of Solaris, created this app to make plant care a breeze and connect fellow plant enthusiasts! 🌱 Join us on this green journey, and reach out through our LinkedIn or GitHub if you want to learn more.
        </p>
        <h3>Larissa Almeida</h3>
        <div className="contact-method">
      
  <a href={git} target="_blank" rel="https://github.com/Larissa-oa">
    <img className="contact-method-title" src={git} alt="GitHub" style={{width: "30px", height: "30px", borderRadius:"50%"}}/>
  </a>
  <a href={link} target="_blank" rel="https://www.linkedin.com/in/larissa-almeida-2a8370253/">
    <img className="contact-method-value" src={link} alt="LinkedIn" style={{width: "30px", height: "30px", borderRadius:"50%"}}/>
  </a>
</div>
<h3>João Jacinto</h3>
        <div className="contact-method">
          
  <a href={git} target="_blank" rel="https://github.com/joaommj">
    <img className="contact-method-title" src={git} alt="GitHub" style={{width: "30px", height: "30px", borderRadius:"50%"}} />
  </a>
  <a href={link} target="_blank" rel="https://www.linkedin.com/in/jo%C3%A3o-jacinto-984b663b/">
    <img className="contact-method-value" src={link} alt="LinkedIn" style={{width: "30px", height: "30px", borderRadius:"50%"}}/>
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
  )
}

export default AboutPage
