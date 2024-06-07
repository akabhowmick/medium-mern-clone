import { Schema, model } from "mongoose";

const userSchema = new Schema({
  displayName: String,
  email: String,
  phoneNumber: String,
  photoURL: String,
  providerId: String,
  uid: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  reading_list: [],
});

export default model("Users", userSchema);
