import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <p className="not-found-message">
        We're sorry, but the page you are looking for does not exist.
      </p>
      <p className="not-found-message">
        You may have mistyped the address or the page may have moved.
      </p>
      <p className="not-found-message">
        Return to{" "}
        <Link to="/" className="not-found-link">
          home
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
