import React from 'react';

const ProductCard = ({ product }) => {
  const { name, category, price, updatedAt } = product;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{name}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {category}
        </span>
        <p className="mt-2 text-lg font-semibold text-gray-900">${price}</p>
        <p className="mt-1 text-sm text-gray-500">Updated: {new Date(updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
