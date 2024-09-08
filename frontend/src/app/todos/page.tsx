"use client";
//TODO CONVERT TO SERVER ACTIONS

import { useEffect } from "react";
import { useTodoContext } from "@/contexts/TodoContext";
import Link from "next/link";

const TodosPage = () => {
  const {
    getTodos,
    state: { todos },
  } = useTodoContext();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id.toString()}
            className={`bg-white p-4 rounded-lg shadow-md ${
              todo.completed ? "bg-gray-200" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <Link
                href={`/todos/${todo._id}`}
                className="text-xl font-semibold text-gray-800 hover:text-blue-600"
              >
                {todo.title}
              </Link>
              <p className="text-sm text-gray-600"></p>
            </div>
            <p className="text-gray-700">{todo.description}</p>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          <p>
            No todos found.{" "}
            <Link href="/todos/new" className="text-blue-500 hover:underline">
              Create a new todo
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default TodosPage;
