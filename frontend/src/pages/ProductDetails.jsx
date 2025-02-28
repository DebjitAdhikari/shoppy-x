
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, 
  Truck, 
  RefreshCw, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  X,
  Upload,
  Play
} from 'lucide-react';
import getProductById from '../services/products/getProductById.js';

// const product = {
//   id: 1,
//   name: 'Classic White Sneakers',
//   price: 89.99,
//   discount: 20,
//   rating: 4.5,
//   reviews: 128,
//   stock: 15,
//   description: 'Premium quality sneakers made with genuine leather and durable rubber sole. Perfect for casual wear and everyday comfort.',
//   longDescription: `Experience unparalleled comfort and style with our Classic White Sneakers. Crafted with premium materials and attention to detail, these sneakers are designed to elevate your everyday look while ensuring maximum comfort.

// The genuine leather upper provides durability and a luxurious feel, while the breathable mesh lining keeps your feet cool throughout the day. The cushioned insole offers superior comfort for extended wear, and the durable rubber outsole ensures excellent traction and longevity.

// Whether you're running errands, meeting friends, or heading to work, these versatile sneakers will complement any casual outfit. The timeless white design with subtle branding makes them a perfect addition to your footwear collection.`,
//   images: [
//     'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2012&q=80',
//     'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80',
//     'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
//   ],
//   sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
//   features: [
//     'Genuine leather upper',
//     'Cushioned insole',
//     'Durable rubber outsole',
//     'Breathable mesh lining',
//   ],
//   allreviews: [
//     {
//       id: 1,
//       name: 'Sanjit Pal',
//       rating: 5,
//       date: '2024-03-15',
//       text: `These sneakers are absolutely amazing! The comfort level is outstanding, and they look even better in person. I've been wearing them daily for the past month, and they still look brand new.`,
//       media: [
//         {
//           type: 'image',
//           url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
//         },
//         {
//           type: 'image',
//           url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
//         },
//         {
//           type: 'video',
//           url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
//           thumbnail: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
//         }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Karan Yadav',
//       rating: 4,
//       date: '2024-03-10',
//       text: `Great sneakers overall! The quality is top-notch, and they're very comfortable. The only reason I'm giving 4 stars instead of 5 is that they run slightly large. I'd recommend going half a size down.`,
//       media: [
//         {
//           type: 'image',
//           url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
//         }
//       ]
//     }
//   ]
// };
const allreviews= [
  {
    id: 1,
    name: 'Sanjit Pal',
    rating: 5,
    date: '2024-03-15',
    text: `These sneakers are absolutely amazing! The comfort level is outstanding, and they look even better in person. I've been wearing them daily for the past month, and they still look brand new.`,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      },
      {
        type: 'video',
        url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      }
    ]
  },
  {
    id: 2,
    name: 'Karan Yadav',
    rating: 4,
    date: '2024-03-10',
    text: `Great sneakers overall! The quality is top-notch, and they're very comfortable. The only reason I'm giving 4 stars instead of 5 is that they run slightly large. I'd recommend going half a size down.`,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      }
    ]
  }
]
const ProductDetails = () => {
  const [product,setProduct]=useState({})
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topRef =useRef()
  const [modalMedia, setModalMedia] = useState({ items: [], currentIndex: 0 });
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: '',
    media: []
  });
  const { id } = useParams();

  

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }
  };
  
  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };
  

  const discountedPrice = product.price * (1 - product.discount / 100);

  const openModal = (media, startIndex) => {
    setModalMedia({ items: media, currentIndex: startIndex });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalMedia(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.items.length
    }));
  };

  const prevModalImage = () => {
    setModalMedia(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
    }));
  };

  const handleFileUpload = (event) => {
    if (event.target.files) {
      setNewReview(prev => ({
        ...prev,
        media: [...prev.media, ...Array.from(event.target.files)]
      }));
    }
  };
  useEffect(()=>{
    topRef.current?.scrollIntoView({behavior:"smooth"})
    console.log(id)
  },[])

  async function fetchProductDetails(){
    const {data} = await getProductById(id)
    console.log(data)
    setProduct(data)
  }
  useEffect(()=>{
    fetchProductDetails()
  },[])

  return (
    <div ref={topRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="relative">
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            {
              product?.images?.length > 0 &&
            (<img
              src={product?.images[currentImage].url}
              alt={product?.name}
              className="w-full h-full object-cover"
            />)
            }
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="flex space-x-4 mt-4 overflow-x-auto pb-2">
            {product?.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden ${
                  currentImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img src={image.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">{product.rating}</span>
            </div>
            <span className="text-gray-600">({product?.reviews} reviews)</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-semibold">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Only {product.inStock} items left!
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{product?.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              {
                product.availableSize && "Select Size"
                }
</h3>
            <div className="flex flex-wrap gap-3">
              {product.availableSize?.split(",").map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Product Features</h3>
            <ul className="space-y-2">
              {product.features?.split(",").map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
              Buy Now
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-sm font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <RefreshCw className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-sm font-medium">7 Days Return</span>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-sm font-medium">Quality Product</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

        {/* Write a Review */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= newReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                value={newReview.text}
                onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Share your experience with this product..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Add Photos/Videos</label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Upload Media</span>
                  </div>
                </label>
                <div className="flex space-x-2">
                  {newReview.media.map((file, index) => (
                    <div key={index} className="relative h-16 w-16">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="h-full w-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setNewReview(prev => ({
                          ...prev,
                          media: prev.media.filter((_, i) => i !== index)
                        }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Submit Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-8">
          {allreviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 bg-transparent ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{review.text}</p>
              
              {review.media && review.media.length > 0 && (
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {review.media.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => openModal(review.media, index)}
                      className="relative flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden group"
                    >
                      <img
                        src={media.type === 'video' ? media.thumbnail : media.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      {media.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative aspect-video">
              {modalMedia.items[modalMedia.currentIndex].type === 'video' ? (
                <video
                  src={modalMedia.items[modalMedia.currentIndex].url}
                  controls
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={modalMedia.items[modalMedia.currentIndex].url}
                  alt=""
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            
            {modalMedia.items.length > 1 && (
              <>
                <button
                  onClick={prevModalImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextModalImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}
            
            <div className="flex justify-center mt-4 space-x-2">
              {modalMedia.items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setModalMedia(prev => ({ ...prev, currentIndex: index }))}
                  className={`w-2 h-2 rounded-full ${
                    index === modalMedia.currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;