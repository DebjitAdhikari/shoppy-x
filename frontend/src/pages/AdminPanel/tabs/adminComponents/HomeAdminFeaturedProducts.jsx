import { AlertTriangle, Edit, ImagePlus, Plus, Trash, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Modal from "../../common/Modal";
import getAllFeaturedProductsService from "../../../../services/products/getAllFeaturedProductsService";
import ImageUploadSection from "../../common/ImageUploadSection";
import updateProductService from "../../../../services/products/updateProductService";
import { ToastContainer } from "react-toastify";
import successToastMessage from "../../../../utils/successToastMessage.js";

function AdminFeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // State for modals and forms
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating,setIsUpdating]= useState(false)

  // State for form management
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    category: "",
    price: "",
    featuredProduct:"",
    discount: "",
    description: "",
    availableSize: "",
    features: "",
  });
  const [editProductForm, setEditProductForm] = useState({
    id: null,
    name: "",
    category: "",
    featuredProduct:"",
    price: "",
    discount: "",
    description: "",
    availableSize: "",
    features: "",
  });

  // Image states
  const [newProductImages, setNewProductImages] = useState([]);
  const [editProductImages, setEditProductImages] = useState([]);

  // References
  const newProductImageRef = useRef(null);
  const editProductImageRef = useRef(null);

  // Item to delete state
  const [itemToDelete, setItemToDelete] = useState(null);

  // Image change handler for new product
  const handleNewProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImagesWithPreview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    // Limit to 5 images
    const updatedImages = [...newProductImages, ...newImagesWithPreview].slice(0, 5);
    setNewProductImages(updatedImages);
  };

  // Image change handler for edit product
  const handleEditProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImagesWithPreview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    // Combine existing product images with new uploads, limit to 5
    const updatedImages = [...editProductImages, ...newImagesWithPreview].slice(0, 5);
    setEditProductImages(updatedImages);
  };

  // Remove image from new product
  const removeNewProductImage = (index) => {
    const updatedImages = newProductImages.filter((_, i) => i !== index);
    setNewProductImages(updatedImages);
  };

  // Remove image from edit product
  const removeEditProductImage = (index) => {
    const updatedImages = editProductImages.filter((_, i) => i !== index);
    setEditProductImages(updatedImages);
  };

  // Open add product modal
  const openAddProductModal = () => {
    setNewProductForm({
      name: "",
      category: "",
      price: "",
      discount: "",
      description: "",
      availableSize: "",
      features: "",
    });
    setNewProductImages([]);
    setShowAddProductModal(true);
  };

  // Open edit product modal
  const openEditProductModal = (product) => {
    setEditProductForm({
      id: product._id,
      name: product.name,
      category: product.category,
      featuredProduct: product.featuredProduct? "yes":"no",
      price: product.price,
      discount: product.discount,
      description: product.description,
      availableSize: product.availableSize,
      features: product.features,
    });
    
    // Convert existing product images to the new format
    const existingImages = product.images.map(img => ({
      preview: img.url,
      file: null // Existing images don't have a file object
    })).slice(0, 5);
    
    setEditProductImages(existingImages);
    setShowEditProductModal(true);
  };

  // Handle input changes for new product
  const handleNewProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for edit product
  const handleEditProductInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log("changed",name,"with",value,"result",editProductForm)
  };

  // Submit new product
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...newProductForm,
      id: featuredProducts.length + 1,
      sizes: newProductForm.sizes ? newProductForm.sizes.split(",").map((s) => s.trim()) : [],
      features: newProductForm.features ? newProductForm.features.split(",").map((f) => f.trim()) : [],
      images: newProductImages.map(img => ({
        url: img.preview,
        file: img.file
      })),
      price: parseFloat(newProductForm.price),
      discount: parseFloat(newProductForm.discount),
    };

    setFeaturedProducts([...featuredProducts, newProduct]);
    setShowAddProductModal(false);
    setNewProductImages([]);
  };

  // Submit edited product
  async function handleEditProductSubmit(e) {
    e.preventDefault();
    setIsUpdating(true)
    // const updatedProducts = featuredProducts.map((product) =>
    //   product.id === editProductForm.id
    //     ? {
    //         ...editProductForm,
    //         sizes: editProductForm.sizes ? editProductForm.sizes.split(",").map((s) => s.trim()) : [],
    //         features: editProductForm.features ? editProductForm.features.split(",").map((f) => f.trim()) : [],
    //         images: editProductImages.map(img => ({
    //           url: img.preview,
    //           file: img.file
    //         })),
    //         price: parseFloat(editProductForm.price),
    //         discount: parseFloat(editProductForm.discount),
    //       }
    //     : product
    // );
    console.log(editProductImages)
    console.log(editProductForm)
    const formData = new FormData()
    formData.append("name", editProductForm.name);
  formData.append("availableSize", editProductForm.availableSize);
  formData.append("category", editProductForm.category);
  formData.append("description", editProductForm.description);
  formData.append("discount", editProductForm.discount);

  formData.append("featuredProduct", editProductForm.featuredProduct==="yes");
  formData.append("features", editProductForm.features);
  formData.append("price", editProductForm.price);
  editProductImages.forEach(img=>{
    if(img.file)
      formData.append("images",img.file)
  })
  editProductImages.forEach(img=>{
    if(img.preview.startsWith("http"))
      formData.append("imageUrls",img.preview)
  })
  const data = await updateProductService(editProductForm.id,formData)
  console.log("updated data ", data )
  data.status==="success" && successToastMessage("Product Updated Successfully")
  setIsUpdating(false)
  
  // setFeaturedProducts(updatedProducts);
    setShowEditProductModal(false);
    setEditProductImages([]);
    fetchFeaturedProducts()
  };

  // Delete product
  const handleDelete = () => {
    if (!itemToDelete) return;

    const { type, id } = itemToDelete;

    if (type === "product") {
      setFeaturedProducts(featuredProducts.filter((p) => p.id !== id));
    }

    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  // Open delete modal
  const openDeleteModal = (type, id) => {
    setItemToDelete({ type, id });
    setShowDeleteModal(true);
  };

  // Fetch featured products
  async function fetchFeaturedProducts() {
    const { data } = await getAllFeaturedProductsService();
    console.log("featured Products", data);
    setFeaturedProducts(data);
  }

  useEffect(() => {
    fetchFeaturedProducts()
  }, []);

  // Render method for image upload section
  

  return (
    <>
      <section className="bg-white rounded-2xl shadow-md p-6">
        <ToastContainer></ToastContainer>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
          <button
            onClick={openAddProductModal}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="relative">
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-lg font-bold text-indigo-600">
                    ${(product.price * (1 - product.discount / 100)).toFixed(0)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {product.availableSize?.split(",")?.map((size, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4 justify-end">
                  <button
                    onClick={() => openEditProductModal(product)}
                    className="p-2 hover:bg-indigo-100 rounded-full transition-colors duration-200 text-indigo-600"
                    aria-label="Edit product"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal("product", product.id)}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors duration-200 text-red-600"
                    aria-label="Delete product"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddProductModal}
        onClose={() => {
          setShowAddProductModal(false);
          setNewProductImages([]);
        }}
        title="Add Product"
      >
        <form
          className="space-y-4 h-[80vh] overflow-y-auto"
          onSubmit={handleAddProductSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Product name"
                value={newProductForm.name}
                onChange={handleNewProductInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                value={newProductForm.category}
                onChange={handleNewProductInputChange}
                required
              >
                <option value="">Select category</option>
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="0.00"
                value={newProductForm.price}
                onChange={handleNewProductInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="0%"
                value={newProductForm.discount}
                onChange={handleNewProductInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              rows="3"
              placeholder="Product description"
              value={newProductForm.description}
              onChange={handleNewProductInputChange}
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Sizes
              </label>
              <input
                type="text"
                name="availableSize"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="S, M, L, XL"
                value={newProductForm.availableSize}
                onChange={handleNewProductInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features
              </label>
              <input
                type="text"
                name="features"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Feature 1, Feature 2"
                value={newProductForm.features}
                onChange={handleNewProductInputChange}
                required
              />
            </div>
          </div>

          
          <ImageUploadSection
            theImages={newProductImages}
            onImageChange={handleNewProductImageChange}
            removeImage={removeNewProductImage}
            imageRef={newProductImageRef}
             >

          </ImageUploadSection>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Add Product
          </button>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={showEditProductModal}
        onClose={() => {
          setShowEditProductModal(false);
          setEditProductImages([]);
        }}
        title="Edit Product"
      >
        <form
          className="space-y-4 h-[80vh] overflow-y-auto"
          onSubmit={handleEditProductSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Product name"
                value={editProductForm.name}
                onChange={handleEditProductInputChange}
                required
              />
            </div>
            {/* edit category */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                value={editProductForm.category}
                onChange={handleEditProductInputChange}
                required
              >
                <option value="">Select category</option>
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </select>
            </div> */}
          </div>
          {/* description and featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                className="w-full h-[100px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Product description"
                value={editProductForm.description}
                onChange={handleEditProductInputChange}
                required
              />
            </div>
              {/* featured */}
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Product
              </label>
              <select
                name="featuredProduct"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                value={editProductForm.featuredProduct}
                onChange={handleEditProductInputChange}
                required
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          {/* price and discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="0.00"
                value={editProductForm.price}
                onChange={handleEditProductInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="0%"
                value={editProductForm.discount}
                onChange={handleEditProductInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Size
              </label>
              <input
                type="text"
                name="availableSize"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="S, M, L, XL"
                value={editProductForm.availableSize||""}
                onChange={handleEditProductInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features
              </label>
              <textarea
                name="features"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Feature 1, Feature 2"
                value={editProductForm.features}
                onChange={handleEditProductInputChange}
                required
              />
            </div>
          </div>

          
          <ImageUploadSection
            theImages={editProductImages}
            onImageChange={handleEditProductImageChange}
            removeImage={removeEditProductImage}
            imageRef={editProductImageRef}
            isEditing={true}
             >

          </ImageUploadSection>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
           {isUpdating?"Updating...":"Update Product"} 
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-red-50 text-red-600 rounded-lg">
            <AlertTriangle className="w-6 h-6 mr-3" />
            <p>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AdminFeaturedProducts;