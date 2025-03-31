import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const navigate = useNavigate();
  const isLowStock = product.inStock <= 5; // Show low stock warning if 5 or less

  return (
    <div
      key={product._id}
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white rounded-xl shadow-md hover:cursor-pointer overflow-hidden group transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:brightness-90"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {product.discount}% OFF
          </div>
        )}
        {isLowStock && (
          <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold animate-pulse">
            Only {product.inStock} left!
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(Number(product.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-bold text-gray-900">₹{product.finalPrice}</span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through">₹{product.actualPrice}</span>
          )}
        </div>
        <button
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default Product;
