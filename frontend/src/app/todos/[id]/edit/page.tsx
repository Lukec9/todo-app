//TODO
"use client";

import React, { useState, useEffect } from "react";
import { useTodoContext } from "@/contexts/TodoContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EditTodo = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const {
    state: { todos },
    editTodo,
  } = useTodoContext();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === id);
    console.log("is it me");
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
    }
  }, [id]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(id, { title, description, completed }); // Using the editTodo function from context
    router.push(`/todos/${id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-gray-700">Completed</span>
        </label>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
          <Link
            href={`/todos/${id}`}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
