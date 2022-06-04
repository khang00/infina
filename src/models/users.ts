import mongoose from "mongoose";
import Orders from "./orders";

const UsersSchema = new mongoose.Schema({
  full_name: String,
  phone: String,
  age: Number,
  gender: String,
  orders: [Orders.OrdersSchema],
});

const UsersModel = mongoose.model("Users", UsersSchema);

export default { UsersModel, UsersSchema };
