"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const {
    state: { user },
    logout,
  } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex justify-between items-center p-5 bg-green-400 text-white">
      <div className="text-2xl">Todo App</div>
      <nav className="flex">
        <Link href="/" className="text-white p-2 mr-2">
          Home
        </Link>
        <Link href="/todos" className="text-white p-2 mr-2">
          Todos
        </Link>
        <Link href="/todos/new" className="text-white p-2 mr-2">
          New Todo
        </Link>
        {user && (
          <Link href="/dashboard" className="text-white p-2 mr-2">
            Dashboard
          </Link>
        )}
      </nav>
      {user ? (
        <div className="flex items-center">
          <p>Welcome, {user?.username}</p>
          <button
            className="bg-[#3b945e] text-white py-2 px-4 ml-2 rounded hover:bg-[#57ba98]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="ml-2">
          <Link href="/signup" className="text-white ml-2">
            Sign up
          </Link>
          <Link href="/login" className="text-white ml-2">
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
