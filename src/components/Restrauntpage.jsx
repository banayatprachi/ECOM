// src/RestaurantPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './Productlist';
import Actcart from './Actcart';
import { Link } from 'react-router-dom';



const RestaurantPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    // Update the fetch call to use the provided API endpoint
    fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?limit=10&page=1')
      .then((response) => response.json())
      .then((data) => {
        // Ensure data.data is an array before setting state
        if (Array.isArray(data.data)) {
          setProducts(data.data);
          setTotalPages(data.totalPages || 1);
        } else {
          console.error('Fetched data does not contain an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
  
    const existingItem = cart.find((item) => item.id === product.id);
  
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
    console.log('Cart after adding:', cart);
  };
  
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="container">
    <nav>
      <Link to="/actcart">Go to Cart</Link>

    </nav>

      <h1>Restaurant Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {index + 1}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default RestaurantPage;




