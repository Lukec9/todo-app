import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TodoContextProvider } from "./contexts/TodoContext";
import { AuthContextProvider, AuthContext } from "./contexts/AuthContext";
import IndexPage from "./components/IndexPage";
import NewTodo from "./components/NewTodo";
import RootLayout from "./layouts/RootLayout";
import ShowTodo from "./components/ShowTodo";
import EditTodo from "./components/EditTodo";
import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  const { state, login } = useContext(AuthContext);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      login(JSON.parse(userFromStorage));
    }
  }, []);
  return (
    <div className="App">
      <TodoContextProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route
              path="login"
              element={
                !state.isAuthenticated ? (
                  <LoginForm />
                ) : (
                  <Navigate to="/todos/new" />
                )
              }
            />
            <Route
              path="signup"
              element={
                !state.isAuthenticated ? <Signup /> : <Navigate to="/todos" />
              }
            />
            <Route
              path="/todos"
              element={
                state.isAuthenticated ? <IndexPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/todos/new"
              element={
                state.isAuthenticated ? <NewTodo /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/todos/:id"
              element={
                state.isAuthenticated ? <ShowTodo /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/todos/:id/edit"
              element={
                state.isAuthenticated ? <EditTodo /> : <Navigate to="/login" />
              }
            />
          </Route>
        </Routes>
      </TodoContextProvider>
    </div>
  );
}

function MainApp() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default MainApp;
