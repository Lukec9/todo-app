"use client";

import { getUserTodos } from "@/actions/auth-actions";
import { useAuthContext } from "@/contexts/AuthContext";
import { TodoExtended } from "@shared/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";
import Image from "next/image";

export default function UserDashboard() {
  const [userTodos, setUserTodos] = useState<TodoExtended[] | null>(null);
  const [loading, setLoading] = useState(true);
  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      if (typeof user?._id === "string") {
        const res = await getUserTodos(user?._id);
        setUserTodos(res);
        setLoading(false);
      }
    };
    getTodos();
  }, [user?._id]);

  // if (loading && !userTodos) return <LoadingSpinner />;
  if (!loading && !userTodos) return <p>User has not made any todos</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 bg-gray-900  shadow-md text-white">
      <div className="flex items-center space-x-4">
        <Image
          src="https://avatars.githubusercontent.com/u/443278?v=4"
          alt="Avatar"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-2xl font-semibold">{user?.username}</h3>
          <p className="text-gray-300">{user?.email}</p>
        </div>
      </div>
      {userTodos?.length && (
        <div>
          <h3 className="text-4xl font-semibold  text-emerald-500">Your Todos:</h3>
          <ul className="space-y-4 mt-4">
            {userTodos.map((todo) => (
              <li
                key={todo._id.toString()}
                className="bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg text-emerald-400 font-semibold">
                      {todo.title}
                    </h4>
                    <p className="text-gray-300">{todo.description}</p>
                  </div>
                  <Link
                    href={`/todos/${todo._id}`}
                    className="text-emerald-400 hover:underline text-sm"
                  >
                    Go to todo
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
}
