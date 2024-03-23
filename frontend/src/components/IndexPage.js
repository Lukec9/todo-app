import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../contexts/TodoContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "../axiosInstance";

const IndexPage = () => {
  const { todos, dispatch } = useContext(TodoContext);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get("/api/todos");
        if (response && response.data) {
          dispatch({ type: "SET_TODOS", payload: response.data });
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getTodos();
  }, [dispatch]);

  return (
    <div className="index-page">
      {todos && todos.length > 0 ? (
        todos.map(todo => (
          <div
            key={todo._id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <div className="todo-header">
              <Link to={`/todos/${todo._id}`} className="todo-title">
                {todo.title}
              </Link>
              <p className="todo-created-at">
                {formatDistanceToNow(new Date(todo.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <p className="todo-description">{todo.description}</p>
          </div>
        ))
      ) : (
        <div className="no-todos">
          <p>
            No todos found. <Link to="/todos/new">Create a new todo</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
