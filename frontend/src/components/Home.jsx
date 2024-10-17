import React, { useContext, useState, useEffect } from 'react';
import Banner1 from '../assets/banner1.jpg';
import Banner2 from '../assets/banner2.jpg';
import Banner3 from '../assets/banner3.jpg';
import Banner4 from '../assets/banner4.jpg';
import Banner5 from '../assets/banner5.jpg';
import Banner7 from '../assets/Banner7.webp';
import Banner8 from '../assets/Banner8.webp';
import ad1 from '../assets/ad1.webp';
import ad2 from '../assets/ad2.webp';
import ad3 from '../assets/ad3.webp';
import ad4 from '../assets/ad4.jpg';
import ad5 from '../assets/ad5.jpg';
import ad6 from '../assets/ad6.webp';
import ad7 from '../assets/ad7.webp';
import ad8 from '../assets/ad8.webp';
import ecomContext from '../context/context';
import { Link } from 'react-router-dom';

// Loader component
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="loader border-t-transparent border-solid rounded-full border-orange-500 border-8 h-16 w-16 animate-spin"></div>
  </div>
);

const Home = () => {
  const { products } = useContext(ecomContext);

  let slides = [Banner2, Banner7, Banner1, Banner3, Banner8, Banner4, Banner5];
  let [current, setCurrent] = useState(0);

  // Loading states
  const [loadingMen, setLoadingMen] = useState(true);
  const [loadingWomen, setLoadingWomen] = useState(true);
  const [loadingKids, setLoadingKids] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoadingMen(false); // Set loading to false once data is loaded
      setLoadingWomen(false);
      setLoadingKids(false);
    }
  }, [products]);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  const SinglePage = (item) => {
    localStorage.setItem('items', item.name);
    localStorage.setItem('items price', item.new_price);
    localStorage.setItem('items oldprice', item.old_price);
    localStorage.setItem('items image', item.image);
    localStorage.setItem('items id', item.id);
    console.log(item);
  };

  return (
    <>
      <div>
        <div className="bg-black text-white p-1 w-full text-xs text-center">
          Shop Our Sale: Big Savings Await!
        </div>
        <div className="sm:mx-36">
          <div className="overflow-hidden relative ">
            <div
              className={`flex transition ease-out duration-40 `}
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {slides.map((s) => {
                return <img src={s} alt="banner" />;
              })}
            </div>

            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
              <button onClick={previousSlide}>
                <span class="material-symbols-outlined text-black font-bold ">
                  arrow_back_ios
                </span>
              </button>
              <button onClick={nextSlide}>
                <span class="material-symbols-outlined text-black font-bold ">
                  arrow_forward_ios
                </span>
              </button>
            </div>

            <div className="absolute bottom-0 py-4 flex w-fit justify-center gap-3 w-full">
              {slides.map((s, i) => {
                return (
                  <div
                    onClick={() => {
                      setCurrent(i);
                    }}
                    key={"circle" + i}
                    className={`rounded-full w-2 h-2 cursor-pointer  ${i === current ? 'bg-white' : 'bg-gray-500'
                      }`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Men's Section */}
        <div className='text-center'>
          <h1 className='text-3xl md:text-5xl m-5'>Just Launched!!! 🚀</h1>
          <p className='mt-6'>Summer Collections for men</p>

          {loadingMen ? (
            <Loader /> // Show loader when data is loading
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6'>
              {products.filter((item) => item.category === "men").slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className='my-5 mx-auto border border-gray-200 rounded-lg text-left shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-64 h-80'
                >
                  <Link to={`${product.name}`} key={product.id}>
                    <div className='overflow-hidden h-48'>
                      <img
                        src={product.image}
                        onClick={() => SinglePage(product)}
                        alt="image"
                        className='w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer'
                      />
                    </div>
                    <div className="p-4">
                      <div className='font-bold text-lg text-gray-800 truncate'>{product.name}</div>
                      <div className='mt-1 text-lg text-green-600 font-semibold'>₹ {product.new_price}</div>
                      <div className='mt-1 text-gray-400 text-sm line-through'>₹ {product.old_price}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 md:mt-24">
            <Link to='/mens'>
              <button className='text-white bg-black p-3 md:p-5 px-6 md:px-8'>
                See More
              </button>
            </Link>
          </div>
        </div>

        {/* Kids Section */}
        <div className='text-center place-content-center'>
          <h1 className='text-4xl mt-3'>Champ Collection</h1>

          {loadingKids ? (
            <Loader /> // Show loader when data is loading
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 ml-2'>
              {products.filter((item) => item.category === "kid" || item.category === "kids").slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className='w-64 h-80 my-5 mx-auto border border-gray-200 rounded-lg text-left shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'
                >
                  <Link to={`/${product.name}`} key={product.id}>
                    <div className='overflow-hidden h-48'>
                      <img
                        src={product.image}
                        onClick={() => SinglePage(product)}
                        alt="product image"
                        className='w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer'
                      />
                    </div>
                    <div className="p-4">
                      <div className='font-bold text-lg text-gray-800 truncate'>{product.name}</div>
                      <div className='mt-1 text-lg text-green-600 font-semibold'>₹ {product.new_price}</div>
                      <div className='mt-1 text-gray-400 text-sm line-through'>₹ {product.old_price}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-24">
            <Link to='/kids'>
              <button className='text-white bg-black p-5 px-8'>
                See More
              </button>
            </Link>
          </div>
        </div>

        {/* Women's Section */}
        <div className='text-center'>
          <h1 className='text-4xl mt-3'>Queens Collection</h1>

          {loadingWomen ? (
            <Loader /> // Show loader when data is loading
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 m-2'>
              {products.filter((item) => item.category === "women" || item.category === "womens").slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className='w-64 h-80 my-5 mx-auto border border-gray-200 rounded-lg text-left shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'
                >
                  <Link to={`/${product.name}`} key={product.id}>
                    <div className='overflow-hidden h-48 mb-3'>
                      <img
                        src={product.image}
                        onClick={() => SinglePage(product)}
                        alt="product"
                        className='w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer'
                      />
                    </div>
                    <div className="p-4">
                      <div className='font-bold text-lg text-gray-800 truncate'>{product.name}</div>
                      <div className='mt-1 text-lg text-green-600 font-semibold'>₹ {product.new_price}</div>
                      <div className='mt-1 text-gray-400 text-sm line-through'>₹ {product.old_price}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-24">
            <Link to='/womens'>
              <button className='text-white bg-black p-5 px-8'>
                See More
              </button>
            </Link>
          </div>
        </div>

        <div className='mb-1'>
          <img src={ad6} alt="" className='my-1' />
          <div className='grid grid-cols-2'>
            <img src={ad7} alt="" />
            <img src={ad8} alt="" />
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
