
import React from 'react';
import { useCart } from './Cartcontext';

const ShoppingCart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const handleIncreaseQuantity = (productId) => {
    addToCart({
      id: productId,
      quantity: cartItems.find((item) => item.id === productId).quantity + 1,
      price_starts_from: cartItems.find((item) => item.id === productId).price_starts_from,
    });
  };

  const handleDecreaseQuantity = (productId) => {
    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem.quantity > 1) {
      addToCart({
        id: productId,
        quantity: existingItem.quantity - 1,
        price_starts_from: existingItem.price_starts_from,
      });
    } else {
      removeFromCart(productId);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.price_starts_from * item.quantity, 0);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul className="list-disc pl-4">
        {cartItems.map((item) => (
          <li key={item.id} className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price_starts_from}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                onClick={() => handleIncreaseQuantity(item.id)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 mr-2 rounded"
                onClick={() => handleDecreaseQuantity(item.id)}
              >
                -
              </button>
              <button
                className="bg-gray-500 text-white px-2 py-1 rounded"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-lg font-semibold">Grand Total: ${calculateGrandTotal()}</p>
    </div>
  );
};

export default ShoppingCart;
