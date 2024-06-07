import { Schema, model } from "mongoose";

const listSchema = new Schema({
  listDetails: {
    type: Schema.Types.ObjectId,
    ref: "Stories",
  },
});

export default model("lists", listSchema);
