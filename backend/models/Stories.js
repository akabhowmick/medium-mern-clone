import { Schema, model } from "mongoose";

const storiesSchema = new Schema({
  title: String,
  content: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default model("stories", storiesSchema);
