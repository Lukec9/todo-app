//TOOD
"use client";

import { useTodoContext } from "@/contexts/TodoContext";
import { TodoExtended } from "@shared/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TodoPage = ({ params }: { params: { id: string } }) => {
  const { getTodo, deleteTodo } = useTodoContext();
  const router = useRouter();
  const [todo, setTodo] = useState<TodoExtended | null>(null);
  const { id } = params;

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          const fetchedTodo = await getTodo(id);
          setTodo(fetchedTodo);
        } catch (error) {
          console.error("Error fetching todo:", error);
        }
      }
    };
    fetchTodo();
  }, [id, getTodo]);

  if (!todo) {
    return (
      <div>
        <h2>Todo not found</h2>
        <Link href={`/todos`}>Go Back</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      deleteTodo(id);
      router.push("/todos");
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{todo.title}</h2>
      <p
        className={`${
          todo.completed ? "text-green-500" : "text-red-500"
        } font-medium mb-2`}
      >
        {todo.completed ? "Completed" : "To finish"}
      </p>
      <p className="text-gray-600 mb-4">{todo.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Created{" "}
        {new Date(todo.createdAt).toLocaleDateString("en-Us", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="text-sm text-gray-500 mb-6">{todo.author?.username}</p>
      <form className="mb-4" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </form>
      <Link
        href={`/todos/${id}/edit`}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Edit
      </Link>
    </div>
  );
};

export default TodoPage;
