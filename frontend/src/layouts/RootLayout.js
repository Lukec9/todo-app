import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
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
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
