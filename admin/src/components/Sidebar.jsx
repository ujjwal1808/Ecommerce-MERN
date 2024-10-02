import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-full bg-gray-800 text-white flex ">
      <div className="p-4 text-2xl font-bold">Admin Panel</div>
      <nav className="flex p-4">
        <Link to="/products" className="py-2 px-4 hover:bg-gray-700 rounded">
          Product List
        </Link>
        <Link to="/orders" className="py-2 px-4 hover:bg-gray-700 rounded">
          Orders List
        </Link>
        <Link to="/add-product" className="py-2 px-4 hover:bg-gray-700 rounded">
          Add Product
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
