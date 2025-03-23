import { AlertTriangle, Edit, Plus, Trash, Upload } from "lucide-react"
import { useRef, useState } from "react";
import Modal from "../../common/Modal";
function AdminFeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState([
        {
          id: 1,
          name: "Classic White T-Shirt",
          price: 29.99,
          discount: 10,
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          sizes: ["S", "M", "L", "XL"],
          features: ["Soft cotton", "Breathable"],
          category: "Men",
          description:
            "A comfortable classic white t-shirt made from 100% premium cotton.",
        },
        {
          id: 2,
          name: "Denim Jeans",
          price: 79.99,
          discount: 15,
          image:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          sizes: ["28", "30", "32", "34"],
          features: ["Stretch fabric", "Modern fit"],
          category: "Men",
          description:
            "Premium denim jeans with a modern fit and comfortable stretch fabric.",
        },
      ]);
    
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [productImagePreview, setProductImagePreview] = useState("");
    const [itemToDelete, setItemToDelete] = useState(null);
    const productImageRef = useRef(null);
    const openProductModal = (product = null) => {
        setEditingProduct(product);
        setProductImagePreview("");
        setShowProductModal(true);
      };
      const handleImageChange = (e, setPreview) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handleDelete = () => {
        if (!itemToDelete) return;
    
        const { type, id } = itemToDelete;
    
       if (type === "product") {
          setFeaturedProducts(featuredProducts.filter((p) => p.id !== id));
        }
    
        setShowDeleteModal(false);
        setItemToDelete(null);
      };
    
      const openDeleteModal = (type, id) => {
        setItemToDelete({ type, id });
        setShowDeleteModal(true);
      };
    return (
        <>
        <section className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
          <button
            onClick={() => openProductModal()}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="relative">
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
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
                <div className="text-sm text-gray-500 mt-1">
                  {product.category}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-lg font-bold text-indigo-600">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {product.sizes.map((size, index) => (
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
                    onClick={() => openProductModal(product)}
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
      {/* form modal */}
      <Modal
      isOpen={showProductModal}
      onClose={() => {
        setShowProductModal(false);
        setEditingProduct(null);
        setProductImagePreview("");
      }}
      title={editingProduct ? "Edit Product" : "Add Product"}
    >
      <form
        className="space-y-4 h-[80vh] overflow-y-auto"
        
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
              defaultValue={editingProduct?.name}
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
              defaultValue={editingProduct?.category}
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
              defaultValue={editingProduct?.price}
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
              defaultValue={editingProduct?.discount}
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
            defaultValue={editingProduct?.description}
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
              name="sizes"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="S, M, L, XL"
              defaultValue={editingProduct?.sizes?.join(", ")}
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
              defaultValue={editingProduct?.features?.join(", ")}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <div className="flex flex-col space-y-3">
            {(productImagePreview || editingProduct?.image) && (
              <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={productImagePreview || editingProduct?.image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer group">
              <Upload className="w-5 h-5 mr-2 text-gray-500 group-hover:text-indigo-500 transition-colors" />
              <span>Upload Image</span>
              <input
                ref={productImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, setProductImagePreview)}
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </Modal>
    {/* delete modal */}
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
    )
}

export default AdminFeaturedProducts
