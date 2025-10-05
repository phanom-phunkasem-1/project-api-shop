// frontend/src/App.jsx

import React from 'react';
import ProductList from './components/ProductList';
import './App.css'; // อาจจะมีไฟล์ CSS สำหรับตกแต่ง

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ยินดีต้อนรับสู่ร้านค้าของฉัน</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;