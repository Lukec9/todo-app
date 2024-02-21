import { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RootLayout() {
  const { state, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="root-layout">
      <header className="header">
        <div className="logo">Todo App</div>
        <nav className="nav">
          <NavLink to="todos" className="nav-link">
            Home
          </NavLink>
          <NavLink to="todos/new" className="nav-link">
            New Todo
          </NavLink>
          <NavLink to="help" className="nav-link">
            Help
          </NavLink>
        </nav>
        {state.isAuthenticated ? (
          <div>
            <p>Welcome, {state.user.username}</p>
            <button onClick={handleLogout}>Logout</button>
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
