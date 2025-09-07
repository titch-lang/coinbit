const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  type: String, // buy / sell
  exchange: String,
  uid: String,
  usdAmount: Number,
  kesAmount: Number,
  phone: String,
  name: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
