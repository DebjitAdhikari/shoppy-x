import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Truck,
  RefreshCw,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Play,
} from "lucide-react";
import Loader from "../components/Loader.jsx";
import getProductById from "../services/products/getProductById.js";
import ErrorPage from "./ErrorPage.jsx";
import addCartProductService from "../services/cart/addCartProductService.js";
import checkProductInCartService from "../services/cart/checkProductInCartService.js";
import deleteCartProductService from "../services/cart/deleteCartProductService.js";
import successToastMessage from "../utils/successToastMessage.js"
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [doesProductExist, setDoesProductExist] = useState(false);
  const [isProductNotFound, setIsProductNotFound] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topRef = useRef();
  const navigate = useNavigate()
  const [modalMedia, setModalMedia] = useState({
    items: [],
    currentIndex: 0,
    mediaType: "image",
  });
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: "",
    media: [],
  });
  const { id } = useParams();

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  const discountedPrice = product.price * (1 - product.discount / 100);

  const openModal = (media, startIndex, mediaType = "image") => {
    setModalMedia({ items: media, currentIndex: startIndex, mediaType });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalMedia((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.items.length,
    }));
  };

  const prevModalImage = () => {
    setModalMedia((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + prev.items.length) % prev.items.length,
    }));
  };

  const handleFileUpload = (event) => {
    if (event.target.files) {
      setNewReview((prev) => ({
        ...prev,
        media: [...prev.media, ...Array.from(event.target.files)],
      }));
    }
  };
  useEffect(() => {
    // topRef.current?.scrollIntoView({behavior:"smooth"})
    window.scrollTo(0, 0);
  }, [isProductLoading]);

 
  async function addToCart(){
    // console.log(product)
    // console.log(selectedSize)
    const formData = new FormData()
    formData.append("productId",product._id)
    formData.append("name",product.name)
    formData.append("image",product.images[0].url)
    if(selectedSize)
      formData.append("size",selectedSize)
    else
      formData.append("size",null)
    formData.append("price",product.finalPrice)
    formData.append("qunatity",1)
    
    setIsAdding(true)

    const data = await addCartProductService(formData)
    // console.log("added",data.data)
    if(data.data.status==="failed")
      return navigate("/userAuth")
    setIsAdding(false)
    setDoesProductExist(true)
    successToastMessage("Product Added to Cart!")
    // console.log(data)
  }
  async function removeFromCart(){
    setIsRemoving(true)
    const data = await deleteCartProductService(product._id)
    setIsRemoving(false)
    setDoesProductExist(false)
    successToastMessage("Product Removed from Cart!")
    // console.log(data)
  }

  async function fetchProductDetails() {
    setDoesProductExist(false)
    setIsProductNotFound(false);
    const { data } = await getProductById(id);
    // console.log(data.status);
    if (data.status === "error") {
      setIsProductNotFound(true);
      setIsProductLoading(false);
      return;
    }

    setIsProductLoading(false);
    setProduct(data);
    const res = await checkProductInCartService(data._id)
    
    setDoesProductExist(res.data.data) //true or false
  }
  // useEffect(()=>{
  //   checkProductExists()
  // },[doesProductExist])
  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <>
      {isProductLoading ? (
        <div className="h-[80vh]">
          <Loader></Loader>
        </div>
      ) : (
        <>
          {isProductNotFound ? (
            <ErrorPage
              customErrorMessage={
                " The product you are looking for doesn't exist"
              }
            />
          ) : (
            <div
              ref={topRef}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden">
                    {product?.images?.length > 0 && (
                      <img
                        src={product?.images[currentImage].url}
                        alt={product?.name}
                        className="w-full h-[400px] sm:h-[500px]  object-cover "
                      />
                    )}
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
                        className={`relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-lg overflow-hidden ${
                          currentImage === index ? "ring-2 ring-blue-500" : ""
                        }`}
                      >
                        <img
                          src={image.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>

                  <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 md:h-5 md:w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600 text-sm md:text-base">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm md:text-base">
                      ({product.reviews?.length} reviews)
                    </span>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <span className="text-2xl md:text-3xl font-bold text-gray-900">
                        ₹{product.finalPrice}
                      </span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-lg md:text-xl text-gray-500 line-through">
                            ₹{product.actualPrice}
                          </span>
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs md:text-sm font-semibold">
                            {product.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-gray-600 mt-2">
                      Only {product.inStock} items left!
                    </p>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg font-semibold mb-2 md:mb-3">
                      Description
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base whitespace-pre-line">
                      {product?.description}
                    </p>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg font-semibold mb-2 md:mb-3">
                      {product.availableSize && "Select Size"}
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {product.availableSize?.split(",").map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg border text-sm md:text-base ${
                            selectedSize === size
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-lg font-semibold mb-2 md:mb-3">
                      Product Features
                    </h3>
                    <ul className="space-y-1 md:space-y-2">
                      {product.features?.split(",").map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600 text-sm md:text-base"
                        >
                          <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                      {
                        doesProductExist?
                        // remove from cart
                        <button
                        disabled={isRemoving}
                          onClick={removeFromCart}
                          className="w-full bg-red-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                        >
                          {
                            isRemoving?"Removing...":"Remove from Cart"
                          }
                          
                        </button>:
                        // add to cart
                        <button disabled={isAdding} onClick={addToCart} className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                          {
                            isAdding?"Adding...":"Add to Cart"
                          }
                          
                        </button>
                      }

                    <button className="w-full bg-gray-900 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
                      Buy Now
                    </button>
                  </div>

                  <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    <div className="flex items-center justify-center p-3 md:p-4 bg-gray-50 rounded-lg text-xs md:text-sm">
                      <Truck className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-2" />
                      Free Delivery
                    </div>
                    <div className="flex items-center justify-center p-3 md:p-4 bg-gray-50 rounded-lg text-xs md:text-sm">
                      <RefreshCw className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-2" />
                      7 Days Return
                    </div>
                    <div className="flex items-center justify-center p-3 md:p-4 bg-gray-50 rounded-lg text-xs md:text-sm">
                      <Shield className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-2" />
                      Quality Product
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Customer Reviews
                </h2>

                {/* Write a Review */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() =>
                              setNewReview((prev) => ({ ...prev, rating }))
                            }
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                rating <= newReview.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={newReview.text}
                        onChange={(e) =>
                          setNewReview((prev) => ({
                            ...prev,
                            text: e.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Share your experience with this product..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Photos/Videos
                      </label>
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
                            <span className="text-sm text-gray-600">
                              Upload Media
                            </span>
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
                                onClick={() =>
                                  setNewReview((prev) => ({
                                    ...prev,
                                    media: prev.media.filter(
                                      (_, i) => i !== index
                                    ),
                                  }))
                                }
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
                  {product.reviews?.map((review) => (
                    <div
                      key={review._id}
                      className="border-b border-gray-200 pb-8"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {review.userName}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 bg-transparent ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(
                                review.reviewedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{review.description}</p>

                      {(review.images || review.videos) &&
                        (review.images.length > 0 ||
                          review.videos.length > 0) && (
                          <div className="flex space-x-4 overflow-x-auto pb-2">
                            {/* for review images */}
                            {review.images?.map((media, index) => (
                              <button
                                key={`img-${index}`}
                                onClick={() =>
                                  openModal(review.images, index, "image")
                                }
                                className="relative flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden group"
                              >
                                <img
                                  src={media.url}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              </button>
                            ))}
                            {/* for review videos */}
                            {review.videos?.map((media, index) => (
                              <button
                                key={`vid-${index}`}
                                onClick={() =>
                                  openModal(review.videos, index, "video")
                                }
                                className="relative flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden group"
                              >
                                <img
                                  src="/images/video-icon.png"
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                  {/* <Play className="h-8 w-8 text-white" /> */}
                                </div>
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
                      {modalMedia.mediaType === "video" ? (
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
                          onClick={() =>
                            setModalMedia((prev) => ({
                              ...prev,
                              currentIndex: index,
                            }))
                          }
                          className={`w-2 h-2 rounded-full ${
                            index === modalMedia.currentIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
