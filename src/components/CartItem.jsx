import React, { useContext } from 'react';
import { CartContext } from '../context/context';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';

function CartItem(props) {
  const { id, image, name, price, quantity } = props;

  const { cart, setCart } = useContext(CartContext);

  function removeProduct(id) {
    setCart(cart.filter((product) => product.id !== id));
    toast.success('Product Removed Succesully');
    console.log(cart);
  }

  function increment(id) {
    const updatedCart = cart.map((product) => {
      if (product.id === id) product.quantity += 1;
      return product;
    });
    setCart(updatedCart);
  }

  function decrement(id) {
    const updatedCart = cart.map((product) => {
      if (product.id === id && product.quantity > 1) product.quantity -= 1;
      return product;
    });
    setCart(updatedCart);
  }

  return (
    <>
      <div className='flex gap-3 py-8 border-t-2 border-gray-300'>
        <div className='w-32 md:w-52 h-36 md:h-56 bg-slate-50 rounded-md'>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-contain'
          />
        </div>
        <div className='grow'>
          <Link to={`/product/${id}`}>{name}</Link>
          <p className='mt-2'>${(price * quantity).toFixed(2)}</p>
          <div className='flex items-center gap-2 mt-10'>
            <button
              onClick={() => decrement(id)}
              className='py-0.5 px-2 rounded-full border-2 border-gray-300'
            >
              -
            </button>
            <div className='border-2 border-gray-300 px-5 py-0.5'>
              {quantity}
            </div>
            <button
              onClick={() => increment(id)}
              className='py-0.5 px-2 rounded-full border-2 border-gray-300'
            >
              +
            </button>
          </div>
        </div>
        <div>
          <RxCross2
            size={20}
            onClick={() => removeProduct(id)}
            className='cursor-pointer'
          />
        </div>
      </div>
    </>
  );
}

export default CartItem;
