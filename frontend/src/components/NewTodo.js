import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import axios from "axios";

const NewTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const { dispatch } = useContext(TodoContext);

  const handleCheckboxChange = async e => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/todos", {
        title,
        description,
        completed,
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
    <>
      <h2>New todo</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </form>
    </>
  );
};

export default NewTodo;
