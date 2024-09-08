//TODO
"use client";

import React, { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTodoContext } from "@/contexts/TodoContext";

const NewTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const { createTodo } = useTodoContext();
  const {
    state: { user },
  } = useAuthContext();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      completed,
      author: user?._id,
    };

    //@ts-expect-error updatedAt and createdAt get added on creation
    createTodo(newTodo);

    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg  focus:ring-2 focus-within:outline-none focus:ring-green-400"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg 
            focus:ring-2 focus-within:outline-none focus:ring-green-400"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">Completed</label>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
