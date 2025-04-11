
import { useState, useEffect } from "react"
import { Leaf, Sun, Sprout, Trees, Send, Menu, X } from "lucide-react"
import "./LandingTemplate.css"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [floatingElements, setFloatingElements] = useState([])

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
        ])
      } else {
        setFloatingElements((prev) => prev.slice(1))
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [floatingElements.length])

  const sections = [
    { id: "home", label: "Sanctuary", icon: <Trees className="icon" /> },
    { id: "about", label: "Journey", icon: <Sprout className="icon" /> },
    { id: "skills", label: "Cultivation", icon: <Sun className="icon" /> },
    { id: "contact", label: "Connect", icon: <Leaf className="icon" /> },
  ]

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

      {/* Header */}
      <header className="site-header">
        <div className="logo-container">
          <div className="logo-circle">
            <Sprout className="logo-icon" />
          </div>
          <span className="logo-text">SOLARIS</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`nav-button ${activeSection === section.id ? "nav-button-active" : ""}`}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={() => setMenuOpen(true)}>
          <Menu className="menu-icon" />
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <button className="mobile-close-button" onClick={() => setMenuOpen(false)}>
              <X className="close-icon" />
            </button>
          </div>
          <div className="mobile-menu-items">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  setMenuOpen(false)
                }}
                className="mobile-menu-item"
              >
                <div className="mobile-menu-icon-container">{section.icon}</div>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Home Section */}
        {activeSection === "home" && (
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
              <button className="primary-button" onClick={() => setActiveSection("skills")}>
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
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <div className="section about-section">
            <div className="section-overlay"></div>
            <div className="section-content">
              <h2 className="section-title">The Journey</h2>
              <div className="about-text">
                <p>
                  In the garden of technology, I cultivate sustainable digital solutions that bridge the gap between
                  nature and innovation. My path began with the first seeds of HTML and has grown into a flourishing
                  ecosystem of modern web development.
                </p>
                <p>
                  Like a gardener tends to their plants, I nurture each project with care, ensuring it grows in harmony
                  with its environment. My approach combines the organic beauty of nature with the precision of clean
                  technology.
                </p>
                <p>
                  When not tending to digital gardens, I contribute to local eco-tech initiatives and explore ways to
                  make technology more sustainable and accessible to all.
                </p>
              </div>
            </div>
            <div className="about-visual">
              <div className="gallery-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="gallery-item"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
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
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <div className="section contact-section">
            <div className="section-overlay"></div>
            <div className="section-content">
              <h2 className="section-title">Connect</h2>
              <div className="contact-info">
                <p className="contact-intro">
                  Let's collaborate on creating sustainable digital solutions that nurture both technology and nature.
                  Reach out through these solar-powered channels.
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
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-copyright">© 2025 Solaris Garden</div>
        <div className="footer-links">
          <span>Growth</span>
          <span>Harmony</span>
          <span>Nature</span>
        </div>
      </footer>
    </div>
  )
}
