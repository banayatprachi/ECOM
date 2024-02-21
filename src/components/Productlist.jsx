
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './Cartcontext';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?limit=10&page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const restaurantData = data.data || [];
        setRestaurants(restaurantData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

 
 
  

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-4">Restaurants</h2>
      <div className="flex flex-wrap justify-around">
        {restaurants.map((restaurant) => (
          <ProductCard key={restaurant.id} restaurant={restaurant} addToCart={addToCart} />
        ))}
      </div>
      <div className="mt-4">
        {/* Pagination */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={prevPage}>
          Prev
        </button>
        <span className="text-xl font-bold text-blue-500 mx-2">Page {currentPage}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
