import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, ChevronDown, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cart from './Cart';
import checkLogin from '../services/users/checkLogin.js';
import getProductsByQueryService from '../services/products/getProductsByQueryService.js';
import getSearchSuggestionsService from '../services/products/getSearchSuggestionsService.js';

const categories = [
  {
    name: "Women's Fashion",
    href: '/category/womens-fashion',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'
  },
  {
    name: "Men's Fashion",
    href: '/category/mens-fashion',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80'
  },
  {
    name: 'Electronics',
    href: '/category/electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Home & Kitchen',
    href: '/category/home-kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Beauty & Health',
    href: '/category/beauty-health',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Sports & Outdoors',
    href: '/category/sports-outdoors',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
];

const cartItems = [
  {
    id: 1,
    name: 'Classic White Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2012&q=80',
    quantity: 1
  },
  {
    id: 2,
    name: 'Leather Crossbody Bag',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    quantity: 2
  },
  {
    id: 3,
    name: 'Minimalist Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=2099&q=80',
    quantity: 1
  }
];



const Navbar = () => {
  const [searchSuggestions,setSearchSuggestions] = useState([])
  const [noResults,setNoResults] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  async function checkIsLoggedIn() {
    const data = await checkLogin()
    console.log("for nav bar cart",data)
    if(data.status==="failed" && data.message==="Not Logged in")
      setIsLoggedIn(false)
    else if(data.data.status==="success")
      setIsLoggedIn(true)
  }
  useEffect(()=>{
    checkIsLoggedIn()
  },[])
 
  useEffect(()=>{
    if(!searchQuery || searchQuery.length<3)
      return
    const timer = setTimeout(async ()=>{

      const data = await getSearchSuggestionsService(searchQuery,1)
      if(data.status==="success"){
        setSearchSuggestions(data.data)
        setShowSearchSuggestions(true)
      }else{
        setShowSearchSuggestions(false)
      }
      console.log(data)
    },300)
    return ()=> clearTimeout(timer)
  },[searchQuery])
  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.getElementById('search-container');
      if (searchContainer && !searchContainer.contains(event.target )) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function goAndHideCategories() {
    setShowCategories(false);
    navigate("/categories");
  }

  const isActivePath = (path) => {
    return location.pathname === path;
  };
  // for showing products by serach results
  async function searchQuerySubmit(e,type="onsubmit"){
    if(type==="onsumbit")
      e.preventDefault()
    if(!searchQuery)
     return
    setShowSearchSuggestions(false)
    navigate(`/products?query=${searchQuery}&page=1`)

  }

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="sm:text-2xl w-[100px]  sm:w-[140px] font-bold text-gray-900">
              <img src="/images/logo-shop.jpeg" className='w-full ' alt="" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center sm:space-x-6">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                  isActivePath('/') ? 'text-blue-600 font-medium' : ''
                }`}
              >
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <Link
                  to="/categories"
                  className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                    isActivePath('/categories') ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>
                
                {/* Categories Dropdown */}
                {showCategories && (
                  <div className="absolute top-full left-0 w-64 mt-1 bg-white rounded-lg shadow-lg py-2 z-50">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className="flex items-center px-4 py-2 hover:bg-gray-50"
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="ml-3 text-gray-700">{category.name}</span>
                      </Link>
                    ))}
                    <button 
                      onClick={goAndHideCategories} 
                      className="flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      See more
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <Link 
                to="/offers" 
                className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                  isActivePath('/offers') ? 'text-blue-600 font-medium' : ''
                }`}
              >
                Offers
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                  isActivePath('/contact') ? 'text-blue-600 font-medium' : ''
                }`}
              >
                Contact
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div id="search-container" className="relative">
                <div onKeyDown={(e)=>e.key==="Enter" && searchQuerySubmit(e,"usingkeydown")} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${
                      isSearchOpen ? 'sm:w-40' : 'hidden'
                    } transition-all duration-300 px-4 py-2 rounded-l-full border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button 
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Search className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Search Suggestions */}
                {showSearchSuggestions && searchQuery && (
                  <div className="absolute top-full -left-5 w-[300px] mt-1 bg-white rounded-lg shadow-lg py-2 z-50">
                    {searchSuggestions.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          window.location.href = `/product/${product._id}`;
                          setShowSearchSuggestions(false);
                        }}
                      >
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          {/* <div className="text-xs text-gray-500">in {product.category}</div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              <Link 
                to="/profile" 
                className={`p-2 hover:bg-gray-100 rounded-full ${
                  isActivePath('/profile') ? 'bg-gray-100' : ''
                }`}
              >
                <User className="h-5 w-5 text-gray-600" />
              </Link>

              <div
                className="relative"
                
              >
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                </button>

                
              </div>
            </div>

            {/* Mobile menu button and search */}
            <div className="md:hidden flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 relative bg-transparent"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <form onSubmit={(e)=>searchQuerySubmit(e,"onsumbit")} className='relative'>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className='absolute right-1 top-1 bg-blue-500 rounded-full p-2 text-white hover:bg-blue-600 transition-colors duration-200'>
                    <Search className="h-5 w-5" />
                  </button>
                  </form>
                  {showSearchSuggestions && searchQuery && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg py-2 z-50">
                    {searchSuggestions.map((product) => (
                      
                      <div
                        key={product._id}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          window.location.href = `/product/${product._id}`;
                          setIsSearchOpen(false); 
                          setShowSearchSuggestions(false);
                        }}
                        onTouchEnd={(e) => { // Add touch handler
                          e.stopPropagation();
                          window.location.href= `/product/${product._id}`;
                          setIsSearchOpen(false);
                          setShowSearchSuggestions(false);
                        }}
                      >
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          {/* <div className="text-xs text-gray-500">in {product.category}</div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed bg-white w-[100vw]">
            <div onClick={() => setIsMenuOpen(false)} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/') 
                    ? 'bg-gray-100 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/categories') 
                    ? 'bg-gray-100 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Categories
              </Link>
              <Link 
                to="/offers" 
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/offers') 
                    ? 'bg-gray-100 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Offers
              </Link>
              <Link 
                to="/contact" 
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/contact') 
                    ? 'bg-gray-100 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Contact
              </Link>
              <Link 
                to="/profile" 
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/profile') 
                    ? 'bg-gray-100 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <Cart setIsCartOpen={setIsCartOpen} 
        cartItems={cartItems}
        totalItems={totalItems}
        subtotal={subtotal}>
        </Cart>
      
      )}
    </>
  );
};

export default Navbar;