import mongoose, { Schema, InferSchemaType } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

export type User = InferSchemaType<typeof UserSchema>


export default mongoose.model("User", UserSchema);
