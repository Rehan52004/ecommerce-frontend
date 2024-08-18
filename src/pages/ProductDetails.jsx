import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../context/context';
import { CiHeart } from 'react-icons/ci';
import { MdStar } from 'react-icons/md';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

function ProductDetails() {
  const { productId } = useParams();
  const { cart, setCart } = useContext(CartContext);

  const [product, setProduct] = useState({});
  const [otherProducts, setOtherProducts] = useState([]);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  function handleAddToCart() {
    const isPresent = cart.find((c) => String(c.id) === productId);
    if (!isPresent) {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
      console.log(cart);
      toast.success('Product added successfully');
    }
  }

  /*
  getting the product details by useParams id
  then finding the all other products by product category
  */
  useEffect(() => {
    async function getData() {
      setLoader(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await res.json();
        setProduct(data);
        const otherRes = await fetch(
          `https://dummyjson.com/products/category/${data.category}`
        );
        const otherData = await otherRes.json();
        setOtherProducts(otherData.products);
        console.log(otherProducts);
        setLoader(false);
      } catch (error) {
        setError('Unable to fetch the product details');
        setLoader(false);
      }
    }
    getData();
  }, [productId]);

  if (loader) {
    return (
      <>
        <div className='flex items-center justify-center h-screen'>
          <p>Loading...</p>
        </div>
      </>
    );
  }

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
      <div className='grid lg:grid-cols-2 gap-10 mt-16 mb-10'>
        <div className=''>
          <div className='w-full h-[400px] lg:h-[600px] bg-gray-100 rounded-md'>
            <img
              src={product.thumbnail}
              alt=''
              className='w-full h-full object-contain'
            />
          </div>
          <div className='flex gap-4 mt-5'>
            {product?.images?.map((image, idx) => (
              <div
                key={idx}
                className='w-20 lg:w-40 h-20 lg:h-40 bg-gray-100 rounded-md'
              >
                <img
                  src={image}
                  alt=''
                  className='w-full h-full object-contain'
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className='text-3xl font-semibold'>{product.title}</h3>
          <p className='text-3xl my-3'>${product.price}</p>
          {/* <p className='bg-green-600 px-2 pt-0.5 w-fit rounded-xl text-white flex items-center gap-1'>
            {product.rating} <MdStar size={20} />
          </p> */}
          <div className='flex items-center'>
            {' '}
            {cart.find((c) => String(c.id) === productId) ? (
              <button className='w-60 lg:w-72 px-3 my-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-md shadow-sm'>
                <Link to='/cart'>Go to Cart</Link>
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className='w-60 lg:w-72 px-3 my-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md shadow-sm'
              >
                Add to Cart
              </button>
            )}
            <button className='hover:bg-gray-100 p-2 ml-3 rounded-md'>
              <CiHeart size={28} />
            </button>
          </div>
          <p className='text-sm my-5'>Description</p>
          <p className='text-sm text-gray-600'>{product.description}</p>
          <p className='text-sm my-5'>Features</p>
          <p className='mt-5 text-sm'>
            <span className=''>Warranty:</span> {product.warrantyInformation}
          </p>
          <p className='text-sm mt-2'>
            <span className=''>By Seller:</span> {product.returnPolicy}
          </p>
          <div>
            <h2 className='text-xl mt-5 mb-3'>Reviews</h2>
            {product?.reviews?.map((review, idx) => (
              <div key={idx} className='text-sm px-1 py-3'>
                <div className='flex w-full gap-4 mt-2 mb-3'>
                  <div className='w-8 h-8 rounded-full bg-indigo-500 mt-6'></div>
                  <div className='border-t-2 border-gray-300 w-full pt-5'>
                    {' '}
                    <p className=''>{review.reviewerName}</p>
                    <p className='text-gray-500'>
                      {review.date.slice(0, review.date.indexOf('T'))}
                    </p>
                    <p className='text-gray-500 mt-4'>{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='border-t-2 border-gray-300'>
        <h2 className='text-4xl font-semibold mt-16 mb-10'>
          Similier Products
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10'>
          {otherProducts.map((product) => (
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
      </div>
    </>
  );
}

export default ProductDetails;
