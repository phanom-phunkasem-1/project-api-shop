// backend/routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ GET สินค้าทั้งหมด
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ POST เพิ่มสินค้าใหม่
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: "เพิ่มสินค้าเรียบร้อย", product: newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
