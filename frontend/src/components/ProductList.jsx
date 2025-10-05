// frontend/src/components/ProductList.jsx

import React, { useState, useEffect } from 'react';

function ProductList() {
  // สร้าง state เพื่อเก็บข้อมูลสินค้า
  const [products, setProducts] = useState([]);
  // สร้าง state เพื่อจัดการสถานะการโหลด
  const [loading, setLoading] = useState(true);
  // สร้าง state เพื่อเก็บข้อผิดพลาด
  const [error, setError] = useState(null);

  // useEffect จะทำงานแค่ครั้งเดียวหลังจากคอมโพเนนต์นี้ถูก render ครั้งแรก
  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลจาก API
    const fetchProducts = async () => {
      try {
        // ดึง URL ของ API จาก environment variable
        const apiUrl = `${import.meta.env.VITE_API_URL}`;
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data); // นำข้อมูลที่ได้ไปเก็บใน state
      } catch (err) {
        setError(err.message); // หากมี error ให้เก็บข้อความ error ไว้
      } finally {
        setLoading(false); // ตั้งค่า loading เป็น false เมื่อจบการทำงาน
      }
    };

    fetchProducts(); // เรียกใช้ฟังก์ชัน
  }, []); // [] ว่าง หมายถึงให้ทำงานแค่ครั้งเดียว

  // แสดงผลตามสถานะต่างๆ
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>รายการสินค้า</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>ราคา: {product.price} บาท</p>
            <p>คงเหลือ: {product.stock} ชิ้น</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;