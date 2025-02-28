import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Product({product}) {
    const navigate = useNavigate()
    return (
        <div key={product.id}
        onClick={()=>{navigate(`/products/${product.id}`)}}
         className="bg-white rounded-xl shadow-sm hover:cursor-pointer overflow-hidden group">
                <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(Number(product.rating))
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                    ₹{product.discount
                        ? (product.price * (1 - product.discount / 100)).toFixed(2)
                        : product.price.toFixed(2)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
    )
}

export default Product
