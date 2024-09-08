"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { TodoExtended } from "@shared/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const {
    state: { user },
    getUserTodos,
  } = useAuthContext();
  const [userTodos, setUserTodos] = useState<TodoExtended[] | null>(null);

  useEffect(() => {
    if (typeof user?._id === "string") {
      getUserTodos(user?._id, setUserTodos);
    }
  }, [user, getUserTodos]);

  if (!user) return;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {userTodos ? (
        <div>
          <h2 className="text-3xl font-bold mb-6">User Dashboard</h2>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">
              Welcome, {user.username}!
            </h3>
            <p className="text-gray-700 text-lg">Email: {user.email}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Your Todos:</h3>
            <ul className="space-y-4">
              {userTodos.map((todo) => (
                <li
                  key={todo._id.toString()}
                  className="flex justify-between items-center"
                >
                  <div>
                    <strong className="font-bold">{todo.title}</strong> -{" "}
                    <span className="text-gray-600">{todo.description}</span>
                  </div>
                  <Link
                    href={`/todos/${todo._id}`}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Go to todo
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>User has not made any todos...</p>
      )}
    </div>
  );
};

export default UserDashboard;
