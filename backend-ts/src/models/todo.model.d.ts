import mongoose from "mongoose";
declare const todoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export type TodoModelType = mongoose.InferSchemaType<typeof todoSchema>;
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    completed: boolean;
    author?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
