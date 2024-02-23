import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { state } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Welcome to the Todo App!</h1>
        <p className="home-paragraph">
          This is a simple Todo application. Easily manage your tasks and stay
          organized. Once logged in, you can manage your todos, add new ones,
          edit existing ones, and mark them as completed.
        </p>
        <div className="home-links">
          {!state.isAuthenticated ? (
            <>
              <Link to="/login" className="home-link">
                Login
              </Link>
              <Link to="/signup" className="home-link">
                Sign up
              </Link>
            </>
          ) : (
            <Link to="/todos" className="home-link">
              View Todos
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
