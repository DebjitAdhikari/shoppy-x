import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import Product from '../components/Product';


const imageUrls = [
  "https://images.unsplash.com/photo-1499096382193-ebb232527fee?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1517635676447-3a480fbfd8f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];


const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 200) + 50,
  discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : 0,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500) + 50,
  image: imageUrls[i % imageUrls.length]
}));

const sortOptions = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Rating', value: 'rating' }
];

const filters = [
  {
    name: 'Price Range',
    options: [
      { value: '0-50', label: 'Under ₹50' },
      { value: '50-100', label: '₹50 to ₹100' },
      { value: '100-200', label: '₹100 to ₹200' },
      { value: '200+', label: 'Over ₹200' }
    ]
  },
  {
    name: 'Rating',
    options: [
      { value: '4+', label: '4 Stars & Up' },
      { value: '3+', label: '3 Stars & Up' },
      { value: '2+', label: '2 Stars & Up' }
    ]
  },
  {
    name: 'Discount',
    options: [
      { value: '10+', label: '10% Off or More' },
      { value: '20+', label: '20% Off or More' },
      { value: '30+', label: '30% Off or More' }
    ]
  }
];

const CategoryProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    'Price Range': null,
    'Rating': null,
    'Discount': null
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (filterName, optionValue) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: prev[filterName] === optionValue ? null : optionValue
    }));
    setCurrentPage(1);
  };

  const filterProducts = (products) => {
    return products.filter(product => {
      // Price Range Filter
      if (selectedFilters['Price Range']) {
        const [min, max] = selectedFilters['Price Range'].split('-').map(Number);
        if (max) {
          if (product.price < min || product.price > max) return false;
        } else {
          if (product.price < min) return false;
        }
      }

      // Rating Filter
      if (selectedFilters['Rating']) {
        const minRating = parseInt(selectedFilters['Rating']);
        if (parseFloat(product.rating) < minRating) return false;
      }

      // Discount Filter
      if (selectedFilters['Discount']) {
        const minDiscount = parseInt(selectedFilters['Discount']);
        if (product.discount < minDiscount) return false;
      }

      return true;
    });
  };

  const filteredProducts = filterProducts(products);
  const itemsPerPage = isMobile ? 10 : 15;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const visiblePages = () => {
    const delta = isMobile ? 1 : 2;
    const range = [];
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  const renderFilterCheckbox = (filter, option) => (
    <label key={option.value} className="flex items-center">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        checked={selectedFilters[filter.name] === option.value}
        onChange={() => handleFilterChange(filter.name, option.value)}
      />
      <span className="ml-2 text-gray-600">{option.label}</span>
    </label>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1 sm:mt-2">{filteredProducts.length} results found</p>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 flex-1 sm:flex-none"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobile && showFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-32">
              {filters.map((filter) => (
                <div key={filter.name} className="mb-6">
                  <h3 className="font-semibold mb-3">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option) => renderFilterCheckbox(filter, option))}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        {!isMobile && showFilters && (
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              {filters.map((filter) => (
                <div key={filter.name} className="mb-6 last:mb-0">
                  <h3 className="font-semibold mb-3">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option) => renderFilterCheckbox(filter, option))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {paginatedProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {visiblePages().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 sm:px-4 py-2 border rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-gray-900 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;