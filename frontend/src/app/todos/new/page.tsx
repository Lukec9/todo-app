"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTodoContext } from "@/contexts/TodoContext";

interface FormValues {
  title: string;
  description: string;
  completed: boolean;
}

const NewTodo = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });

  const { createTodo } = useTodoContext();
  const {
    state: { user },
  } = useAuthContext();

  const onSubmit = async (data: FormValues) => {
    const newTodo = {
      ...data,
      author: user?._id,
    };

    //@ts-expect-error updatedAt and createdAt get added on creation
    createTodo(newTodo);

    // Reset form values
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border border-emerald-500 bg-gray-900 shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-emerald-500 mb-4">New Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-3 text-white/75 border-emerald-500 border bg-transparent rounded-lg focus:ring-2 focus-within:outline-none focus:ring-emerald-400"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            {...register("description", { required: "Description is required" })}
            className="w-full p-3 text-white/75 border-emerald-500 border bg-transparent rounded-lg focus:ring-2 focus-within:outline-none focus:ring-emerald-400"
          />
        </div>
        <div className="relative flex items-center">
          <input
            type="checkbox"
            {...register("completed")}
            className="peer appearance-none w-5 h-5 border-2 border-emerald-500 rounded-sm bg-transparent
              t-1 shrink-0  checked:border-0 relative focus-within:outline-none  focus:border-[3px] cursor-pointer
              "
          />
          <label className="text-emerald-500 text-base ml-2">Completed</label>
          <svg
            className="absolute w-4 h-4 top-1 left-[0.15rem] hidden peer-checked:block pointer-events-none stroke-emerald-500"
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

        <button
          type="submit"
          className="w-full bg-emerald-500 text-white focus-within:outline-none focus:bg-emerald-600 p-3 rounded-lg hover:bg-emerald-600 transition focus:ring-2 focus:ring-emerald-400"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
