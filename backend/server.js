// backend/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://project-api-shop.vercel.app" 
}));

app.use(express.json());

// 4. เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI) // ✅ แก้จาก MONGO_URL เป็น MONGO_URI
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// 5. กำหนด Routes หลัก
app.get("/", (req, res) => {
  res.send("Shop API Running 🛍️");
});

app.use("/api/products", productRoutes);

// 6. เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});