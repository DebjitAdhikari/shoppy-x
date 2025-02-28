import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom"
const products = [
    {
      id: 1,
      name: 'Classic White Sneakers',
      price: 89.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2012&q=80',
    },
    {
      id: 2,
      name: 'Leather Crossbody Bag',
      price: 129.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    },
    {
      id: 3,
      name: 'Minimalist Watch',
      price: 199.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=2099&q=80',
    },
    {
      id: 4,
      name: 'Denim Jacket',
      price: 149.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
  ];
function FeaturedProduts() {
    const navigate =useNavigate()
    return (
        <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">₹{product.price}</p>
                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="w-full bg-gray-900 text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition duration-300"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
        </section>
    )
}

export default FeaturedProduts
