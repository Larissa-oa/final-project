import React from 'react';
import './NotFoundPage.css';
import plantpic from "../assets/images/plantpic-1.avif"
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img
        src={plantpic}
        alt="404 Not Found"
        className="not-found-image"
      />
      <h1 className="not-found-title">Oops! Page not found</h1>
      <p className="not-found-text">
      Uh oh... this page didn’t grow properly 🌱 It doesn't exist or has been moved.
      </p>
      <Link to="/" className="link-not-found">
      <button className="not-found-link">Go back to homepage</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;