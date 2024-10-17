import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProductList from './components/ProductList'
import OrderList from './components/OrderList'
import AddProduct from './components/AddProduct'

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row">
        {/* Main Content */}
        <div className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
          <button onClick={toggleSidebar} className="md:hidden text-white">
            {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
