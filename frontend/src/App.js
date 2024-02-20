import { TodoContextProvider } from "./contexts/TodoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./components/IndexPage";
import NewTodo from "./components/NewTodo";
import RootLayout from "./layouts/RootLayout";
import ShowTodo from "./components/ShowTodo";
import EditTodo from "./components/EditTodo";

function App() {
  return (
    <div className="App">
      <TodoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/todos" element={<IndexPage />} />
              <Route path="/todos/new" element={<NewTodo />} />
              <Route path="/todos/:id" element={<ShowTodo />} />
              <Route path="/todos/:id/edit" element={<EditTodo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TodoContextProvider>
    </div>
  );
}

export default App;
