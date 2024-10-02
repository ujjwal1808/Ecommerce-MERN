import React from 'react'
import { useState, useEffect, useContext } from 'react'
import product from './womens_products/womens_products'
import { Link } from 'react-router-dom'
import ecomContext from '../context/context'

const Womens = () => {
  const [next, setNext] = useState(0)
  const [next2, setNext2] = useState(next + 12)
  const [search, setSearch] = useState('')
  const [style, setStyle] = useState('')
  const [styleprev, setStyleprev] = useState('')

  const { setSingleProducts } = useContext(ecomContext)
  const { products } = useContext(ecomContext)
  var count = products.filter((item) => item.category === "women" || item.category === "womens").length

  const SinglePage = (item) => {
    localStorage.setItem('items', item.name)
    localStorage.setItem('items price', item.new_price)
    localStorage.setItem('items oldprice', item.old_price)
    localStorage.setItem('items image', item.image)
    localStorage.setItem('items id', item.id)
    console.log(item)

    setSingleProducts(item)
  }

  useEffect(() => {
    if (next2 > count) {
      setStyle('none')
    } else {
      setStyle('')
    }
  }, [setStyle, next2, count])

  useEffect(() => {
    if (next === 0) {
      setStyleprev('none')
    } else {
      setStyleprev('')
    }
  }, [setStyle, next, count])

  const nextItem = () => {
    if (next2 < count) {
      setNext(next2)
      setNext2(next2 + 12)
    } else {
      alert("No more products... stocks are coming")
    }
  }

  const prevItem = () => {
    if (next > 0) {
      setNext(next - 12)
      setNext2(next2 - 12)
    }
  }

  return (
    <>
      <div className='sm:flex gap-10'>
        <div className="m-12">
          <div className="text-sm mb-4">
            <Link to="/" className='opacity-50 hover:opacity-100'>Home</Link><span>/</span><a href="">All Products</a>
          </div>
        </div>
        <div className="product m-2 mr-5 items-center">
          <div>
            <h1 className="text-4xl ">Womens Products</h1>
            <input
              type="text"
              className='border-black rounded border mt-5 w-72 py-1.5'
              onChange={(e) => setSearch(e.target.value)}
            /> {" "} <button className='bg-black text-white p-2 rounded'>Search</button>
            <div className="text-md mt-5">{count} Products</div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-5">
              {products.filter((item) => item.category === "womens" || item.category === "women")
                .filter((product) => {
                  if (search === '') {
                    return product
                  } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
                    return product
                  }
                })
                .slice(next, next2)
                .map((product) => (
                  <div key={product.id} className=' size-40 border h-fit border-gray rounded text-left '>
                    <Link to={`/${product.name}`} key={product.id} >
                      <div className='overflow-hidden mb-3'>
                        <img
                          src={product.image}
                          onClick={() => SinglePage(product)}
                          alt="image"
                          key={product.id}
                          className='hover:scale-150 transition-all duration-500 cursor-pointer'
                        />
                      </div>
                      <div className="p-2">
                        <div>{product.name}</div>
                        <div>₹ {product.new_price}</div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>

            <div className="flex justify-center text-3xl mt-20">
              <button onClick={prevItem} style={{ display: styleprev }}>{'<'}</button>
              <button onClick={nextItem} style={{ display: style }}>{'>'}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Womens
