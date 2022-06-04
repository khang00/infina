import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  full_name: String,
  code: String,
  amount: String,
  interest_rate: Number,
});

const OrdersModel = mongoose.model("Orders", OrdersSchema);

export default { OrdersModel, OrdersSchema };
