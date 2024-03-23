import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../axiosInstance";

const NewTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const { dispatch } = useContext(TodoContext);
  const { state } = useContext(AuthContext);

  const handleCheckboxChange = async e => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = async (e, userId) => {
    const author = userId;

    e.preventDefault();
    try {
      const response = await axios.post("/api/todos", {
        title,
        description,
        completed,
        author,
      });

      if (response && response.data) {
        dispatch({ type: "CREATE_TODO", payload: response.data });
      }

      setTitle("");
      setDescription("");
      setCompleted(false);
    } catch (error) {
      console.error("Failed to create todo", error.response.data);
    }
  };

  return (
    <div className="new-todo">
      <h2>New Todo</h2>
      <form
        onSubmit={e => handleSubmit(e, state.user?._id)}
        className="todo-form"
      >
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
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
