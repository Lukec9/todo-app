import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { TodoContext } from "../contexts/TodoContext";
import axios from "axios";

const ShowTodo = () => {
  const { dispatch } = useContext(TodoContext);
  const [todo, setTodo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/todos/${id}`
        );
        if (response && response.data) {
          setTodo(response.data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getTodo();
  }, [dispatch, id]);

  if (!todo) {
    return (
      <div>
        <h2>Todo not found</h2>
        <Link to={`/todos`}>Go Back</Link>
      </div>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/todos/${id}`
      );
      dispatch({ type: "DELETE_TODO", payload: response.data });
      navigate("/todos");
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <div className="todo-details">
      <h2>{todo.title}</h2>
      <p
        className={`todo-status ${todo.completed ? "completed" : "unfinished"}`}
      >
        {todo.completed ? "Completed" : "To finish"}
      </p>
      <p className="todo-description">{todo.description}</p>
      <p className="todo-created-at">
        Created{" "}
        {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
      </p>
      <p>{todo.author?.username}</p>
      <form onSubmit={handleSubmit}>
        <button>Delete</button>
      </form>
      <Link to={`/todos/${id}/edit`}>Edit</Link>
    </div>
  );
};

export default ShowTodo;
