import React from 'react';
import { Link } from 'react-router-dom';


const ProductCard = ({ restaurant, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(restaurant);
  };

  return (
    <div className="border rounded overflow-hidden shadow-lg m-4 w-64">
      {restaurant && restaurant.image && (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{restaurant && restaurant.name}</div>
       
        <p className="text-gray-700 text-base">Price: ${restaurant && restaurant.price_starts_from}</p>
        <Link to={`/product/${restaurant.id}`} className="text-blue-500">
          View
        </Link>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
