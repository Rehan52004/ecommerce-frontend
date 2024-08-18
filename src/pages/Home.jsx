import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  //   pagination states
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  console.log(skip);

  useEffect(() => {
    async function getproducts() {
      setLoader(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        const data = await res.json();
        setProducts(data.products);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setError('Something went wrong');
        setLoader(false);
      }
    }
    getproducts();
  }, [skip]);

  /* loader message for user experience*/
  if (loader) {
    return (
      <>
        <div className='flex items-center justify-center h-screen'>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  /* if any error occure we render only error message*/
  if (error) {
    return (
      <>
        <div className='flex items-center justify-center h-screen'>
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className=''>
        <h1 className='text-4xl font-semibold mt-16 mb-10'>All Products</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10'>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                name={product.title}
                image={product.thumbnail}
                price={product.price}
              />
            </div>
          ))}
        </div>
        {/* pagination must be implemented in future */}
        <div className='flex justify-end gap-3 mb-10'>
          <button
            disabled={skip === 0 ? true : false}
            className={`px-5 py-2 border-2 border-gray-500 rounded-md shadow-sm ${
              skip <= 0 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : ''
            }`}
            onClick={() =>
              setSkip((prev) => (skip > 0 ? Number(prev) - 10 : ''))
            }
          >
            Previous
          </button>
          <button
            disabled={skip === 190 ? true : false}
            className={`px-5 py-2 border-2 border-gray-500 rounded-md shadow-sm ${
              skip === 190 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : ''
            }`}
            onClick={() =>
              setSkip((prev) => (skip <= 180 ? Number(prev) + 10 : ''))
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
