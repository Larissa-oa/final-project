
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import "./MobileMenu.css"

const MobileMenuPortal = ({ sections, onClose }) => {
  return createPortal(
    <div className="mobile-menu">
      <div className="mobile-menu-header">
        <button className="mobile-close-button" onClick={onClose}>
          <X className="close-icon" />
        </button>
      </div>
      <div className="mobile-menu-items">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.link}
            className="mobile-menu-item"
            onClick={onClose}
          >
            <div className="mobile-menu-icon-container">{section.icon}</div>
            {section.label}
          </Link>
        ))}
      </div>
    </div>,
    document.body 
  );
};

export default MobileMenuPortal;
