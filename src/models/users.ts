import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  full_name: String,
  phone: String,
  age: Number,
  gender: String,
}, {timestamps: true});

const UsersModel = mongoose.model("Users", UsersSchema);

export default { UsersModel, UsersSchema };
