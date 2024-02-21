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
            <Route
              path="login"
              element={
                !state.isAuthenticated ? (
                  <LoginForm />
                ) : (
                  <Navigate to="/todos" />
                )
              }
            />
            <Route
              path="signup"
              element={
                !state.isAuthenticated ? <Signup /> : <Navigate to="/todos" />
              }
            />
            <Route path="/todos" element={<IndexPage />} />
            <Route path="/todos/new" element={<NewTodo />} />
            <Route path="/todos/:id" element={<ShowTodo />} />
            <Route path="/todos/:id/edit" element={<EditTodo />} />
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
