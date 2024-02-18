import IndexPage from "./components/IndexPage";
import NewTodo from "./components/NewTodo";
import { TodoContextProvider } from "./contexts/TodoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ShowTodo from "./components/ShowTodo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TodoContextProvider>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/todos" element={<IndexPage />} />
              <Route path="/todos/new" element={<NewTodo />} />
              <Route path="/todos/:id" element={<ShowTodo />} />
            </Route>
          </Routes>
        </TodoContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
