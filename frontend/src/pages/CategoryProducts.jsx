import React, { useState, useEffect } from "react";
import {
  redirect,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Star, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Product from "../components/Product";
import Loader from "../components/Loader.jsx";
import getProductsByCategoryService from "../services/products/getProductsByCategoryService.js";
import scrollToPageTop from "../utils/scrollToPageTop.js";
import NoProductsFound from "../components/NoProductsFound.jsx";
import getCategoryByValueService from "../services/categories/getCategoryByValueService.js";
import { Helmet } from "react-helmet-async";

const sortOptions = [
  { name: "Most Popular", value: "popular" },
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "price_asc" },
  { name: "Price: High to Low", value: "price_desc" },
  { name: "Rating", value: "rating" },
];

const filters = [
  {
    name: "Price Range",
    options: [
      { value: "0-50", label: "Under ₹50" },
      { value: "50-100", label: "₹50 to ₹100" },
      { value: "100-200", label: "₹100 to ₹200" },
      { value: "200+", label: "Over ₹200" },
    ],
  },
  {
    name: "Rating",
    options: [
      { value: "4+", label: "4 Stars & Up" },
      { value: "3+", label: "3 Stars & Up" },
      { value: "2+", label: "2 Stars & Up" },
    ],
  },
  {
    name: "Discount",
    options: [
      { value: "10+", label: "10% Off or More" },
      { value: "20+", label: "20% Off or More" },
      { value: "30+", label: "30% Off or More" },
    ],
  },
];

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [theCurrentPage, setTheCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    "Price Range": null,
    Rating: null,
    Discount: null,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (filterName, optionValue) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: prev[filterName] === optionValue ? null : optionValue,
    }));
    setCurrentPage(1);
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      // Price Range Filter
      if (selectedFilters["Price Range"]) {
        const [min, max] = selectedFilters["Price Range"]
          .split("-")
          .map(Number);
        if (max) {
          if (product.price < min || product.price > max) return false;
        } else {
          if (product.price < min) return false;
        }
      }

      // Rating Filter
      if (selectedFilters["Rating"]) {
        const minRating = parseInt(selectedFilters["Rating"]);
        if (parseFloat(product.rating) < minRating) return false;
      }

      // Discount Filter
      if (selectedFilters["Discount"]) {
        const minDiscount = parseInt(selectedFilters["Discount"]);
        if (product.discount < minDiscount) return false;
      }

      return true;
    });
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

  const navigate = useNavigate();
  //getting which category
  const { category } = useParams();
  //for gettin query params
  const [searchParams, setSearchParams] = useSearchParams();

  //to have query params in url
  function restrictParams() {
    const pageParam = searchParams.get("page");
    if (!pageParam) {
      navigate(`/categories/${category}?page=1`, { replace: true });
      return;
    }
  }

  async function fetchCategoryTitle() {
    const data = await getCategoryByValueService(category);
    // console.log("title",data)
    setTitle(data.title);
  }

  async function fetchProducts() {
    const pageParam = searchParams.get("page");
    setIsLoading(true);
    const data = await getProductsByCategoryService(category, pageParam);
    setTheCurrentPage(parseInt(pageParam));
    setProducts(data.data);
    setTotalResults(data.totalResults);
    setTotalPages(data.totalPages);
    console.log(data);
    setIsLoading(false);
    scrollToPageTop();
  }
  useEffect(() => {
    fetchCategoryTitle();
  }, []);
  useEffect(() => {
    //redirect user to have query page params
    restrictParams();
    fetchProducts();
  }, [searchParams]);
  return (
    <>
    <Helmet>
    <title>{`${title} Products | ShoppyX`}</title>
        <meta
          name="description"
          content={`Browse top-rated ${title.toLowerCase()} products at ShoppyX. Discover the best deals, new arrivals, and customer favorites.`}
        />
        <meta
          name="keywords"
          content={`buy ${category}, ${category} products, ${category} deals, ${category} shopping, ShoppyX ${category}`}
        />
        <meta property="og:title" content={`${category} Products | ShoppyX`} />
        <meta
          property="og:description"
          content={`Explore a wide range of ${category.toLowerCase()} at ShoppyX. Great prices, trending items, and fast delivery.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://shoppy-x.vercel.app/categories/${category.toLowerCase()}`} />
        <meta
          property="og:image"
          content="https://shoppy-x.vercel.app/og-default.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://shoppy-x.vercel.app/categories/${category.toLowerCase()}`} />
    </Helmet>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2">
            {totalResults} results found
          </p>
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
                    {filter.options.map((option) =>
                      renderFilterCheckbox(filter, option)
                    )}
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
                    {filter.options.map((option) =>
                      renderFilterCheckbox(filter, option)
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className=" h-[60vh]">
              <Loader></Loader>
            </div>
          ) : totalResults === 0 ? (
            <NoProductsFound></NoProductsFound>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products?.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="mt-8 sm:mt-12 flex justify-center">
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => {
                    setSearchParams({ page: theCurrentPage - 1 });
                  }}
                  disabled={theCurrentPage === 1}
                  className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => {
                      setSearchParams({ page: i + 1 });
                    }}
                    className={`px-3 sm:px-4 py-2 border rounded-lg 
                    ${
                      theCurrentPage === i + 1
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  // onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalProductsPage))}
                  onClick={() => {
                    setSearchParams({ page: theCurrentPage + 1 });
                  }}
                  disabled={theCurrentPage === totalPages}
                  className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CategoryProducts;
