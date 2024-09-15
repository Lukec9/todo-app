import { deleteTodo, getTodo } from "@/actions/todo-actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TodoPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const todo = await getTodo(id);

  if (!todo) {
    return (
      <div>
        <h2>Todo not found</h2>
        <Link href={`/todos`}>Go Back</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="max-w-2xl mx-auto p-6 w-[95%]  border border-emerald-500 shadow-md rounded-lg mt-10 space-y-2">
        <h1 className="text-4xl font-bold text-emerald-500 ">{todo.title}</h1>
        <p className="text-2xl font-semibold text-emerald-500  text-black/85">
          {todo.completed ? "Completed" : "To complete"}
        </p>
        <p className="text-xl text-emerald-400 ">{todo.description}</p>
        <p className="text-base text-emerald-300 ">
          Created{" "}
          {new Date(todo.createdAt).toLocaleDateString("en-Us", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <div className="flex flex-col gap-y-3">
          <Link
            aria-label="Edit Todo Button"
            href={`/todos/${id}/edit`}
            className="px-4 py-2 max-w-min rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition"
          >
            Edit
          </Link>
          <form
            className=""
            action={async () => {
              "use server";
              await deleteTodo(id);
              redirect("/todos");
            }}
          >
            <button
              type="submit"
              className="px-4 py-2 bg-red-500  text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
