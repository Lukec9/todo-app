import { getTodos } from "@/actions/todo-actions";
import Link from "next/link";

export default async function TodosPage() {
  const todos = await getTodos();

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center text-center">
        <h2 className="text-4xl">You don&apos;t have any todos yet</h2>
        <Link href="/todos/new">
          <a className="text-emerald-700 underline">Create one now</a>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 p-4 border-r border-emerald-600">
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="/todos/new"
              className="block px-4 py-2 rounded-md text-emerald-300 hover:bg-emerald-500"
            >
              New Todo
            </Link>
          </li>
          <li>
            <Link
              href="/todos/completed"
              className="block px-4 py-2 rounded-md text-emerald-300 hover:bg-emerald-500"
            >
              Completed
            </Link>
          </li>
        </ul>
      </aside>
      <div className="flex-1 p-4 bg-gray-900">
        <h1 className="text-3xl text-emerald-400 font-semibold">Todos</h1>
        {todos && todos.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {todos.map((todo) => (
              <li
                key={todo._id.toString()}
                className="bg-gray-800 rounded-md p-4 shadow-md"
              >
                <Link
                  href={`/todos/${todo._id}`}
                  className="block text-lg font-semibold text-emerald-400 hover:text-emerald-500"
                >
                  {todo.title}
                </Link>
                <p className="mt-2 text-gray-500">{todo.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-center text-gray-500">
            No todos found.{" "}
            <Link href="/todos/new" className="text-emerald-600 hover:underline">
              Create a new todo
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
