import React from 'react'
import { Send } from "lucide-react";
import "./AboutPage.css"

const AboutPage = () => {
  return (
    <div>
       <div className="section contact-section">
    <div className="section-overlay"></div>
    <div className="section-content">
      <h2 className="section-title">Connect</h2>
      <div className="contact-info">
        <p className="contact-intro">
          Let's collaborate on creating sustainable digital solutions that nurture both technology and nature. Reach out
          through these solar-powered channels.
        </p>
        <div className="contact-method">
          <p className="contact-method-title">Digital Garden (Email)</p>
          <p className="contact-method-value">gardener@solaris.earth</p>
        </div>
        <div className="contact-method">
          <p className="contact-method-title">Solar Network (Social)</p>
          <p className="contact-method-value">@solaris_garden</p>
        </div>
        <button className="primary-button">
          <Send className="button-icon-left" /> Send a Message
        </button>
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
