"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.documentElement.classList.toggle("overflow-hidden", !isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        document.documentElement.classList.remove("overflow-hidden");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    state: { user },
  } = useAuthContext();

  return (
    <header className="flex relative top-0 justify-between h-20 items-center p-5 bg-emerald-500 text-white">
      <div className="text-2xl min-w-fit">Todo App</div>
      <nav
        className={`${
          isMenuOpen
            ? "opacity-100 visible translate-y-0 top-20"
            : "opacity-0 invisible -translate-y-10 top-0"
        } md:opacity-100 md:visible md:translate-y-0 md:flex md:relative fixed  left-0 right-0 bg-emerald-500 transition-all duration-300 z-10`}
      >
        <div className="flex flex-col md:flex-row justify-center text-lg pl-4 md:gap-4">
          <Link href="/" className="text-white p-2">
            Home
          </Link>
          <Link href="/todos" className="text-white p-2">
            Todos
          </Link>
          <Link href="/todos/new" className="text-white p-2">
            New Todo
          </Link>
          {user && (
            <Link href="/dashboard" className="text-white p-2">
              Dashboard
            </Link>
          )}
        </div>
      </nav>
      {!isMenuOpen ? (
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      ) : (
        <button
          className="md:hidden text-3xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          &times;
        </button>
      )}
    </header>
  );
}
