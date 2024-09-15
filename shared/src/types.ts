import { InferSchemaType, ObjectId } from "mongoose";
import { todoModelSchema } from "./schemas";
export interface User {
  email: string;
  todos: ObjectId[];
}

export interface UserExtended extends User {
  _id: string | ObjectId;
  username: string;
  password: string;
  hash?: string;
  salt?: string;
  __v?: number;
}

export type Todo = {
  _id: ObjectId | string;
  title: string;
  description: string;
  completed: boolean;
  author: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
};
export type TodoExtended = Todo & {
  author: UserExtended;
};
