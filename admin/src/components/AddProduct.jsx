import React, { useState } from 'react'

const AddProduct = () => {
  const [image, setImage] = useState(false)
  const [productData, setProductData] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: ''
  })

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    console.log(productData)
    let responseData;
    let product = productData;
    let formData = new FormData();
    formData.append('product', image);

    await fetch('https://ecommerce-mern-backend-4y6r.onrender.com/upload', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: formData,
    }).then((res) => res.json()).then((data) => { responseData = data })

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product)
      await fetch('https://ecommerce-mern-backend-4y6r.onrender.com/addproduct', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(product),
      }).then((res) => res.json()).then((data) => {
        data.success ? alert('product added') : alert('failed')
      })
      setProductData({
        name: '',
        old_price: '',
        new_price: '',
        category: ''
      })
      setImage(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleAddProduct} className="mb-8 w-full">
      <h1 className="text-3xl font-bold mb-4 ">Add New Product</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Product Title</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            placeholder="Product Title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="old_price"
            value={productData.old_price}
            onChange={handleChange}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            placeholder="Old Price"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Offer Price</label>
          <input
            type="number"
            name="new_price"
            value={productData.new_price}
            onChange={handleChange}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            placeholder="New Price"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            placeholder="Category"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            placeholder="image"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
