import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  const { id, name, image, price } = props;
  return (
    <>
      <Link to={`/product/${id}`}>
        <div>
          <div className='bg-gray-50 rounded-md w-full h-[350px] hover:shadow-sm'>
            <img
              src={image}
              alt={name}
              className='w-full h-full object-contain'
            />
          </div>
          <div className='px-2'>
            <h3 className='mt-2 text-gray-700 text-sm'>{name}</h3>
            <p className='text-lg'>${price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
