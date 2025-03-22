import React, { useState } from 'react';
import { Plus, Edit, Trash, Star } from 'lucide-react';
import Modal from '../common/Modal';
import ReactPaginate from 'react-paginate';

const ProductsTab = () => {
  const [showModal, setShowModal] = useState(false);

  // Example products
  const products = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      category: 'Men',
      price: 29.99,
      discount: 10,
      inStock: 50,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 2,
      name: 'Denim Jeans',
      category: 'Women',
      price: 79.99,
      discount: 15,
      inStock: 30,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 3,
      name: 'Running Shoes',
      category: 'Sports',
      price: 99.99,
      discount: 0,
      inStock: 25,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 4,
      name: 'Leather Wallet',
      category: 'Accessories',
      price: 49.99,
      discount: 5,
      inStock: 40,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.category}</div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">${product.price}</span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span>{product.rating}</span>
                <span className="text-gray-500 ml-2">({product.inStock} in stock)</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 text-blue-600 hover:bg-blue-50 rounded flex items-center justify-center">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button className="flex-1 py-2 text-red-600 hover:bg-red-50 rounded flex items-center justify-center">
                  <Trash className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName="flex justify-center items-center space-x-2"
        pageClassName="px-3 py-1 rounded hover:bg-gray-100"
        previousClassName="px-3 py-1 rounded hover:bg-gray-100"
        nextClassName="px-3 py-1 rounded hover:bg-gray-100"
        activeClassName="bg-blue-500 text-white"
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Product"
      >
        <form className="space-y-4 h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Select category</option>
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="0%"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                In Stock
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              placeholder="Product description"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Sizes (comma-separated)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="S, M, L, XL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features (comma-separated)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Feature 1, Feature 2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductsTab;