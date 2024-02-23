import React, { useContext, useEffect } from "react";
import axios from "axios";
import { TodoContext } from "../contexts/TodoContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const { todos, dispatch } = useContext(TodoContext);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/todos", {
          withCredentials: true, // Include cookies with the request
        });
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
      {todos &&
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
        ))}
    </div>
  );
};

export default IndexPage;
