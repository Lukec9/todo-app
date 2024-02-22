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
    <div className="todo-list">
      {todos &&
        todos.map(t => (
          <div
            key={t._id}
            className={`todo-item ${t.completed ? "completed" : ""}`}
          >
            <div className="todo-header">
              <Link to={`/todos/${t._id}`} className="todo-title">
                {t.title}
              </Link>
              <p className="todo-created-at">
                {formatDistanceToNow(new Date(t.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <p className="todo-description">{t.description}</p>
          </div>
        ))}
    </div>
  );
};

export default IndexPage;
