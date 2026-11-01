const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
    },
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);