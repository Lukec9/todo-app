import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function Home() {
  const { state } = useContext(AuthContext); // Fixed typo here (removed extra 'se' in 'useContext')
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Todo App!</h1>
      <p style={styles.paragraph}>
        This is a simple Todo application. Easily manage your tasks and stay
        organized. Once logged in, you can manage your todos, add new ones, edit
        existing ones, and mark them as completed.
      </p>
      <div style={styles.linksContainer}>
        {!state.isAuthenticated ? (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <span style={styles.linkSeparator}> | </span>
            <Link to="/signup" style={styles.link}>
              Sign up
            </Link>
          </>
        ) : (
          <Link to="/todos" style={styles.link}>
            View Todos
          </Link>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    margin: "50px auto",
    padding: "20px",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  linksContainer: {
    display: "flex",
    justifyContent: "center",
  },
  link: {
    fontSize: "16px",
    textDecoration: "none",
    color: "#007bff",
    transition: "color 0.3s ease",
    marginRight: "10px",
  },
  linkSeparator: {
    fontSize: "16px",
    color: "#555",
  },
};

export default Home;
