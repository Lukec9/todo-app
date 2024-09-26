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
    logout,
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

  //FIXME overlfow when there is more todos

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 min-h-screen bg-gray-900  shadow-md text-white lg:border-x lg:border-emerald-500">
      <div className="flex justify-between items-center border-b border-emerald-500 pb-6">
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
            <p className="text-gray-300">
              {loading ? "[Email Protected] " : user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="border border-emerald-500 p-2 rounded-md text-emerald-500 hover:underline text-sm"
        >
          Logout
        </button>
      </div>
      {userTodos?.length !== 0 && (
        <div>
          <h3 className="text-4xl font-semibold  text-emerald-500">Your Todos:</h3>
          <ul className="space-y-4 mt-4">
            {userTodos?.map((todo) => (
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
                    className="text-emerald-400 hover:underline text-sm transition duration-300"
                  >
                    Go to todo
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !userTodos?.length && (
        <>
          <p className="text-center text-emerald-500">
            You haven&apos;t created any todos yet
          </p>
          <Link
            href="/todos/new"
            className="block max-w-fit text-lg text-white mx-auto py-2 px-4 border border-emerald-500 rounded-lg hover:bg-emerald-500/50 focus:ring-2 ring-emerald-400 transition text-center focus-within:outline-none focus:ring-emerald-500 "
          >
            Create one now
          </Link>
        </>
      )}
      {loading && <Loading />}
    </div>
  );
}
