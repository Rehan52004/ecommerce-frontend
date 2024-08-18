import React, { useContext } from 'react';
import { CartContext } from '../context/context';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import toast from 'react-hot-toast';

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  let otherPrice = {
    shippingPrice: 5,
    plateformPrice: 0.2,
  };

  /* we can add payment integration in future */
  function handleSuccessMessage() {
    toast.success('Order placed successfully');
    setCart([]);
    navigate('/');
  }

  let totalPrice = cart.reduce((acc, product) => {
    return (acc += product.price * product.quantity);
  }, 0);

  /* if there is no product in cart so we render only this message */
  if (cart.length === 0) {
    return (
      <>
        <div className='h-screen flex items-center justify-center'>
          <div>
            <h1 className='text-center mb-5 text-lg'>Your cart is empty</h1>
            <Link to='/'>
              <button className='bg-indigo-600 text-white rounded-md w-72 h-12'>
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className=''>
        <h1 className='text-3xl font-semibold mt-16 mb-10'>Shopping Cart</h1>
        <div className='grid lg:grid-cols-12 gap-14 mb-10'>
          <div className='lg:col-span-7'>
            {cart.map((product) => (
              <CartItem
                id={product.id}
                image={product.thumbnail}
                name={product.title}
                price={product.price}
                quantity={product.quantity}
              />
            ))}
          </div>
          <div className='lg:col-span-5'>
            <div className='bg-gray-50 p-5 text-sm'>
              <h3 className='text-lg mb-3'>Order Summary</h3>
              <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                <p className='text-gray-500'>Subtotal</p>
                <p className='font-[400]'>${totalPrice.toFixed(2)}</p>
              </div>
              <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                <p className='text-gray-500'>Discount</p>
                <p>10%</p>
              </div>
              <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                <p className='text-gray-500'>Shipping Charge</p>
                <p>${otherPrice.shippingPrice}</p>
              </div>
              <div className='flex items-center justify-between border-b-2 border-gray-300 py-4'>
                <p className='text-gray-500'>Plateform Fee</p>
                <p>${otherPrice.plateformPrice}</p>
              </div>
              <div className='flex items-center justify-between py-4 text-base'>
                <p>Total</p>
                <p>
                  $
                  {(
                    totalPrice +
                    otherPrice.plateformPrice +
                    otherPrice.shippingPrice -
                    (totalPrice * 1) / 10
                  ).toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleSuccessMessage}
                className='w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md shadow-sm'
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
