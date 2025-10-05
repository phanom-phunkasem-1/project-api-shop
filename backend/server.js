// backend/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

// 1. เรียกใช้ dotenv ก่อนเสมอ เพื่อให้ process.env พร้อมใช้งาน
dotenv.config();

// 2. สร้าง instance ของ express แค่ครั้งเดียว
const app = express();

// 3. กำหนดค่า Middleware ทั้งหมดที่นี่
app.use(cors({
  // ระบุ URL ของ Frontend ที่จะอนุญาต (เอา / ปิดท้ายออก)
  origin: "https://project-api-shop-zhlw.vercel.app" 
}));
app.use(express.json()); // สำหรับแปลง request body เป็น JSON

// 4. เชื่อมต่อ MongoDB
mongoose.connect(process.env.VITE_MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// 5. กำหนด Routes หลัก
// Route ทดสอบ
app.get("/", (req, res) => {
  res.send("Shop API Running 🛍️");
});

// ใช้งาน Route สินค้า โดยให้มี path เริ่มต้นคือ /api/products
app.use("/api/products", productRoutes);

// 6. เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000; // เพิ่ม Default Port เผื่อไม่มีใน .env
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});