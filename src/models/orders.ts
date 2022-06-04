import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  fullName: String,
  code: String,
  amount: String,
  interestRate: Number,
});

const OrdersModel = new mongoose.Model("Orders", OrdersSchema);

export default { OrdersModel, OrdersSchema };
