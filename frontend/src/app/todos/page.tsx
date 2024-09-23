import { getTodos } from "@/actions/todo-actions";
import Link from "next/link";

export default async function TodosPage() {
  const todos = await getTodos();

  if (todos?.length === 0) {
    return (
      <div className="flex flex-col items-center mt-16 text-center text-emerald-500">
        <h2 className="text-4xl">You don&apos;t have any todos yet</h2>
        <Link className="underline text-emerald-700" href="/todos/new">
          Create one now
        </Link>
      </div>
    );
  }
  return (
    <div className="flex h-screen">
      <aside className="w-64 p-4 bg-gray-900 border-r border-emerald-600">
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
        <h1 className="text-3xl font-semibold text-emerald-400">Todos</h1>
        {todos && todos.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {todos.map((todo) => (
              <li
                key={todo._id.toString()}
                className="p-4 bg-gray-800 rounded-md shadow-md"
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
