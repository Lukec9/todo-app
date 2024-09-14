"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect } from "react";
import { useTodoContext } from "@/contexts/TodoContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { editTodo } from "@/actions/todo-actions";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  completed: z.boolean(),
});

export default function EditTodo({ params }: { params: { id: string } }) {
  const { register, trigger, getValues, setValue, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const {
    state: { todos },
  } = useTodoContext();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      setValue("title", todo.title);
      setValue("description", todo.description);
      setValue("completed", todo.completed);
    }
  }, [id, todos, setValue]);

  const onSubmit = async () => {
    const result = await trigger();

    if (!result) return;

    const data = getValues();
    // @ts-expect-error data is an object
    await editTodo(id, data);
    router.push(`/todos/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border-emerald-500 bg-gray-900 shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-emerald-500 mb-4">Edit Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            spellCheck="false"
            placeholder="Title"
            {...register("title")}
            className="w-full p-3 border text-white/75 border-emerald-500 bg-transparent rounded-lg focus:ring-2 focus-within:outline-none focus:ring-emerald-400"
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            spellCheck="false"
            {...register("description")}
            className="w-full p-3 border border-emerald-500 resize-none text-white/75 bg-transparent rounded-lg focus:ring-2 focus-within:outline-none focus:ring-emerald-400"
          />
        </div>
        <div className="relative flex items-center">
          <input
            type="checkbox"
            spellCheck="false"
            {...register("completed")}
            className="peer appearance-none w-5 h-5 border-emerald-500 rounded-sm bg-transparent
              t-1 shrink-0 checked:bg-emerald-800 checked:border-0 checked:ring-0 relative focus-within:outline-none   focus-within:ring focus-within:ring-emerald-400 focus:border-emerald-400 cursor-pointer"
          />
          <label className="text-emerald-500 text-base ml-2">Completed</label>
          <svg
            className="absolute w-4 h-4 top-1 left-[0.2rem] hidden peer-checked:block pointer-events-none stroke-emerald-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="w-20 min-w-min p-3 text-lg text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition focus:ring-2 ring-emerald-400"
          >
            Edit
          </button>
          <Link
            href={`/todos/${id}`}
            className="text-lg text-white mx-2 py-2 px-4 border border-emerald-500 rounded-lg hover:bg-emerald-500/50 focus:ring-2 ring-emerald-400 transition text-center flex items-center justify-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
