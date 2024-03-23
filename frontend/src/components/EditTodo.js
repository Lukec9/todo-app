import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { TodoContext } from "../contexts/TodoContext";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const { todos, dispatch } = useContext(TodoContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const todo = todos.find(todo => todo._id === id);
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
    }
  }, [todos, id]);

  const handleCheckboxChange = e => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        title,
        description,
        completed,
      });

      if (response && response.data) {
        dispatch({ type: "UPDATE_TODO", payload: response.data });
      }

      // Clear input fields after successful update
      setTitle("");
      setDescription("");
      setCompleted(false);
      navigate(`/todos/${id}`);
    } catch (error) {
      console.error("Failed to update todo", error.response.data);
    }
  };

  return (
    <div className="edit-todo">
      <h2>Edit Todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="todo-input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="todo-input"
        />
        <label className="todo-checkbox">
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
          />
        </label>
        <button type="submit" className="btn">
          Edit
        </button>
        <Link to={`/todos/${id}`} className="btn">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditTodo;
