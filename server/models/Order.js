const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
    },
    productId: {
      type: ObjectId,
      ref: "products",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
