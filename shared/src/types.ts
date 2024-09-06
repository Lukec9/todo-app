import { ObjectId } from 'mongoose'
import { TodoModelType } from '@backend/models/todo.model'
export interface User {
  email: string,
  todos: ObjectId[]
}

export interface UserExtended extends User {
  _id: string | ObjectId;
  username: string,
  password: string,
  hash?: string,
  salt?: string,
  __v?: number
}

export type Todo = TodoModelType

