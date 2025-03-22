import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import Modal from '../common/Modal';

const CategoriesTab = () => {
  const [showModal, setShowModal] = useState(false);

  // Example categories
  const categories = [
    {
      id: 1,
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      productCount: 150,
    },
    {
      id: 2,
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1525845859779-54d477ff291f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      productCount: 200,
    },
    {
      id: 3,
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      productCount: 100,
    },
    {
      id: 4,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      productCount: 75,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img src={category.image} alt={category.name} className="w-full h-48 object-contain" />
              <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                {category.productCount} Products
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Category"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter category name"
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
            Add Category
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesTab;