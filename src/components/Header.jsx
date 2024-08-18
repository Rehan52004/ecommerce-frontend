import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/context';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';

function Header() {
  const { cart } = useContext(CartContext);

  const mobileView = useRef();

  function showMenu() {
    mobileView.current.classList.remove('-top-60');
    mobileView.current.classList.add('top-0');
  }

  function closeMenu() {
    mobileView.current.classList.remove('top-0');
    mobileView.current.classList.add('-top-60');
  }
  return (
    <>
      <div className='relative'>
        <div className='flex items-center justify-between py-5'>
          <div className='text-xl'>Profile.fyi</div>
          <div className='hidden md:flex gap-5 text-sm'>
            <Link to='/'>Home</Link>
            <Link to='/cart'>Cart ({cart.length})</Link>
            <Link to='/wishlist'>Wishlist</Link>
          </div>
          <div className='block md:hidden'>
            <RxHamburgerMenu
              size={20}
              onClick={showMenu}
              className='cursor-pointer'
            />
          </div>
        </div>
        <div
          ref={mobileView}
          className='absolute -top-60 bg-white px-3 w-full h-60'
        >
          <div className='mt-5 pr-10 w-full flex justify-end'>
            <RxCross2
              size={20}
              onClick={closeMenu}
              className='cursor-pointer'
            />
          </div>
          <div className='w-fit mx-auto flex flex-col gap-4 text-center mt-10'>
            <Link to='/'>Home</Link>
            <Link to='/cart'>Cart ({cart.length})</Link>
            <Link to='/wishlist'>Wishlist</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
