import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import Modal from '../common/Modal';

const HomeTab = () => {
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Example data
  const banners = [
    {
      id: 1,
      heading: 'Summer Collection',
      description: 'Discover our new summer styles',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 2,
      heading: 'Winter Sale',
      description: 'Up to 50% off on winter wear',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 2,
      name: 'Denim Jeans',
      price: 79.99,
      discount: 15,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  const featuredCategories = [
    {
      id: 1,
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 2,
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1525845859779-54d477ff291f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banners Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Hero Banners</h2>
          <button
            onClick={() => setShowBannerModal(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Banner
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img src={banner.image} alt={banner.heading} className="w-full h-48 object-contain" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{banner.heading}</h3>
                <p className="text-gray-600 mt-1">{banner.description}</p>
                <div className="flex gap-2 mt-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <button
            onClick={() => setShowProductModal(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through">${product.price}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Categories</h2>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Category
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {featuredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-32 object-contain" />
              <div className="p-3">
                <h3 className="text-center font-semibold">{category.name}</h3>
                <div className="flex justify-center gap-2 mt-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <Modal
        isOpen={showBannerModal}
        onClose={() => setShowBannerModal(false)}
        title="Add Hero Banner"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter banner heading"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              placeholder="Enter banner description"
            ></textarea>
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
            Add Banner
          </button>
        </form>
      </Modal>

      {/* Product Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title="Add Featured Product"
      >
        <form className="space-y-4">
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
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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

      {/* Category Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title="Add Featured Category"
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

export default HomeTab;