import mongoose from "mongoose";
import { todoModelSchema } from "../../../shared/dist/schemas.js";

export default mongoose.model("Todo", todoModelSchema);
