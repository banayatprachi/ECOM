import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './Cartcontext';

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Ziggy</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/cart" className="text-white relative">
            🛒 {cartItems.length > 0 && <span className="bg-red-500 text-white rounded-full px-2 absolute -top-2 -right-2">{cartItems.length}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
