import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Header from './components/Header';
import ProductDetails from './pages/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* react-hot-toast element for user experience */}
        <Toaster />
        <div className='w-full px-3 xl:w-[1222px] mx-auto'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/product/:productId' element={<ProductDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
