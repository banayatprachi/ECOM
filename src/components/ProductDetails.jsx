
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { id } = useParams();

  // To Find the product with the matching id
  const productDetails = products.find(product => product.id === parseInt(id, 10));

  if (!productDetails) {
    return <div className="text-center mt-8">Product not found</div>;
  }

  return (
<div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
  <h2 className="text-3xl font-bold mb-4">{productDetails.name}</h2>
  <div className="flex justify-center">
    {productDetails.image && (
      <img
        src={productDetails.image}
        alt={productDetails.name}
        className="w-64 h-64 object-cover rounded-lg"
      />
    )}
  </div>
  <div className="mt-4 flex flex-col items-center">
    <p className="text-lg font-medium mb-2">Type: {productDetails.type}</p>
    <p className="text-lg font-medium mb-2">Rating: {productDetails.rating}</p>
    <p className="text-lg font-medium mb-2">No of votes: {productDetails.number_of_votes}</p>
    <p className="text-lg font-medium">Price: ${productDetails.price_starts_from.toFixed(2)}</p>
   
  </div>
</div>

  );
};

export default ProductDetails;
