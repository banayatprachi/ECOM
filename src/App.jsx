
import React, { useState ,useEffect} from 'react';
import ProductsList from './components/Productlist';
import { CartProvider } from './components/Cartcontext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';


const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)

  useEffect(() => {
    
    fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?limit=10&page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data || []);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [currentPage]);

  return (
    <Router>
      <CartProvider>
        <Navbar/>
        <Routes>
        <Route path="/" element={<ProductsList />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/product/:id" element={<ProductDetails products={products} />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
