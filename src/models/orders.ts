import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  full_name: String,
  code: String,
  amount: Number,
  interest_rate: Number,
}, {timestamps: true});

const OrdersModel = mongoose.model("Orders", OrdersSchema);

export default {OrdersModel, OrdersSchema};
