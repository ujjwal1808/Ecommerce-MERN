import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ProductList = () => {
    const [allproducts, setAllproducts] = useState([]) // Initialize as an empty array
  
    const fetchInfo = async () => {
        try {
            const res = await axios.get('https://ecommerce-mern-backend-4y6r.onrender.com/getallproduct');
            setAllproducts(res.data);  // Axios stores the response data in res.data
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const removeItem = async (id) =>{
        await fetch('https://ecommerce-mern-backend-4y6r.onrender.com/removeproduct',{
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo()
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    return (
        <div className='w-full'>
            <h1 className="text-3xl font-bold mb-4">Product List</h1>
            <table className="bg-white w-full" border={1}>
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Product</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Old Price</th>
                        <th className="py-2 px-4 border-b">New Price</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {allproducts.length > 0 ? (
                        allproducts.map((product, index) => (
                            <tr key={index} className='items-center text-center'>
                                <td className="py-2 px-4 border-b w-40"><img src={product.image} alt="" /></td>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.old_price}</td>
                                <td className="py-2 px-4 border-b">{product.new_price}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">
                                    <button onClick={()=> removeItem(product.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Remove</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No Products Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList
