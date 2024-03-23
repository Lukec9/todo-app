import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../axiosInstance";
import { TodoContext } from "../contexts/TodoContext";

export default function RootLayout() {
  const { state, logout } = useContext(AuthContext);
  const { dispatch } = useContext(TodoContext);

  const handleLogout = async () => {
    logout();
    try {
      await axios.get("/api/users/logout");
      dispatch({ type: "SET_TODOS", payload: {} });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <div className="root-layout">
      <header className="header">
        <div className="logo">Todo App</div>
        <nav className="nav">
          <NavLink to="" className="nav-link">
            Home
          </NavLink>
          <NavLink to="todos" className="nav-link">
            Todos
          </NavLink>
          <NavLink to="todos/new" className="nav-link">
            New Todo
          </NavLink>
          {state.isAuthenticated && (
            <NavLink to="dashboard" className="nav-link">
              Dashboard
            </NavLink>
          )}
        </nav>
        {state.isAuthenticated ? (
          <div className="user-section">
            <p>Welcome, {state.user.username}</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="login-signup">
            <NavLink to="/signup">Sign up</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
