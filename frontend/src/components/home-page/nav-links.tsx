"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

function ButtonLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-lg text-white mx-2 py-2 px-4 border border-white rounded hover:bg-white hover:text-black transition duration-300"
    >
      {children}
    </Link>
  );
}

export default function AuthButtons() {
  const {
    state: { user },
  } = useAuthContext();

  return (
    <>
      {!user ? (
        <>
          <ButtonLink href="/login">Login</ButtonLink>
          <ButtonLink href="/signup">Sign up</ButtonLink>
        </>
      ) : (
        <ButtonLink href="/todos">View Todos</ButtonLink>
      )}
    </>
  );
}
