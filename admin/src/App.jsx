import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProductList from './components/ProductList'
import OrderList from './components/OrderList'
import AddProduct from './components/AddProduct'

function App() {
  return (
    <Router>
        <Sidebar />
        <div className="w-full p-8">
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </div>
    </Router>
  )
}

export default App
