const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Place an order (logged-in users only)
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Look up real prices from the database (never trust prices from the browser)
    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
      const qty = Number(item.qty);
      if (!qty || qty < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      if (product.stock < qty) {
        return res
          .status(400)
          .json({ message: product.name + " has only " + product.stock + " in stock" });
      }
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        qty,
        image: product.image,
      });
      total += product.price * qty;
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      total,
    });

    // Reduce stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// My orders
router.get("/mine", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;