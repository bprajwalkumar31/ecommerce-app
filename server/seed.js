require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  { name: "Wireless Earbuds", description: "Bluetooth 5.3, 24 hour battery", price: 1499, category: "Electronics", stock: 25, image: "https://picsum.photos/seed/earbuds/400/300" },
  { name: "Smart Watch", description: "Heart rate, sleep and step tracking", price: 2999, category: "Electronics", stock: 15, image: "https://picsum.photos/seed/watch/400/300" },
  { name: "Backpack", description: "Water resistant, fits a 15 inch laptop", price: 1199, category: "Fashion", stock: 40, image: "https://picsum.photos/seed/backpack/400/300" },
  { name: "Running Shoes", description: "Lightweight and comfortable", price: 2499, category: "Fashion", stock: 30, image: "https://picsum.photos/seed/shoes/400/300" },
  { name: "Steel Water Bottle", description: "1 litre, keeps drinks cold for 12 hours", price: 599, category: "Home", stock: 60, image: "https://picsum.photos/seed/bottle/400/300" },
  { name: "Desk Lamp", description: "LED lamp with 3 brightness levels", price: 899, category: "Home", stock: 20, image: "https://picsum.photos/seed/lamp/400/300" },
  { name: "Notebook Pack", description: "Set of 5 ruled notebooks", price: 349, category: "Stationery", stock: 100, image: "https://picsum.photos/seed/notebook/400/300" },
  { name: "Gaming Mouse", description: "Adjustable DPI with RGB lighting", price: 1299, category: "Electronics", stock: 35, image: "https://picsum.photos/seed/mouse/400/300" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Seeded " + products.length + " products");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();