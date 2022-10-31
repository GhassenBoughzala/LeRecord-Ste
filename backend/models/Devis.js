const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const DevisSchema = new Schema(
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

module.exports = mongoose.model("devis", DevisSchema);
