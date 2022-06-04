import mongoose from "mongoose";
import Orders from "./orders";

const UsersSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  age: String,
  gender: Number,
  orders: [Orders.OrdersSchema],
});

const UsersModel = new mongoose.Model("Users", UsersSchema);

export default { UsersModel, UsersSchema };
