import React from 'react'
import { Sprout } from "lucide-react"
import "./LandingPage.css"
import "./GardenPage.css"

const GardenPage = () => {
  return (
    <div>
      <div className="section skills-section">
    <div className="section-overlay"></div>
    <h2 className="section-title">Cultivation</h2>
    <div className="skills-grid">
      {[
        { name: "Organic HTML", desc: "Growing strong foundations for digital ecosystems" },
        { name: "Natural CSS", desc: "Shaping interfaces with nature's flowing patterns" },
        { name: "Sustainable JavaScript", desc: "Powering interactions with clean energy" },
        { name: "React Ecosystem", desc: "Nurturing component-based digital gardens" },
        { name: "Next.js Innovation", desc: "Building efficient, sustainable web solutions" },
        { name: "Green Architecture", desc: "Designing eco-conscious digital structures" },
      ].map((skill, index) => (
        <div key={index} className="skill-card">
          <div className="skill-icon-container">
            <Sprout className="skill-icon" />
          </div>
          <h3 className="skill-title">{skill.name}</h3>
          <p className="skill-description">{skill.desc}</p>
        </div>
      ))}
    </div>
  </div>
    </div>
  )
}

export default GardenPage
