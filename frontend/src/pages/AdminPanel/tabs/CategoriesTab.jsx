import React, { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash, X } from "lucide-react";
import Modal from "../common/Modal";
import createCategoryService from "../../../services/categories/createCategoryService.js";
import getAllCategoriesService from "../../../services/categories/getAllCategoriesService";
import successToastMessage from "../../../utils/successToastMessage.js";
import updateCategoryService from "../../../services/categories/updateCategoryService";
const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    title: "",
    value: "",
  });
  const [editCategory,setEditCategory]=useState({})
  const [editCategoryImage,setEditCategoryImage]=useState("")
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFilePreview, setImageFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  function handleImageFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (imageFilePreview)
        // if already exist clean up for memory leak
        URL.revokeObjectURL(imageFilePreview);
      //at first set the file
      setImageFile(file);
      //now genereate url for preview
      const imageUrl = URL.createObjectURL(file);
      setImageFilePreview(imageUrl);
    }
  }
  // clean up for memory leak
  useEffect(() => {
    return () => {
      if (imageFilePreview) URL.revokeObjectURL(imageFilePreview);
    };
  }, [imageFilePreview]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleEditInputChange(e) {
    const { name, value } = e.target;
    setEditCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRemoveImage(e) {
    e.preventDefault();
    setImageFile(null);
    setEditCategoryImage("")
    //handling for edit form cuz then it will be url 

    setImageFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleNewSubmit(e) {
    e.preventDefault();
    setIsUploading(true);
    console.log(newCategory);
    console.log(imageFile);
    const formData = new FormData();
    formData.append("title", newCategory.title);
    formData.append("value", newCategory.value);
    formData.append("image", imageFile);
    const data = await createCategoryService(formData);
    console.log(data);
    setShowModal(false);
    fetchCategories();
    successToastMessage("Categories Added!");
  }

  function openEditModalForm(category){
    setShowEditModal(true)
    setEditCategory(category)
    setEditCategoryImage(category.image.url)
    setImageFilePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  async function handleEditSubmit(e){
    e.preventDefault()
    setIsUploading(true)
    console.log(editCategory)
    // console.log(imageFile)
    
    const formData = new FormData()
    formData.append("title",editCategory.title)
    formData.append("value",editCategory.value)
    if(imageFile)
    formData.append("image",imageFile)
    const data = await updateCategoryService(editCategory._id,formData)
    console.log(data)
    setIsUploading(false)
    setShowEditModal(false)
    fetchCategories()
    successToastMessage("Category Updated!")

  }
  // Example categories

  async function fetchCategories() {
    const { data } = await getAllCategoriesService();
    console.log(data);
    setCategories(data);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add
        </button>
      </div>
    {/* categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-0">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
          >
            <div className="relative aspect-[4/3] bg-gray-50">
              <img
                src={category.image.url}
                alt={category.title}
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-95"
              />
            </div>
            <div className="p-5 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {category.title}
              </h3>
              <div className="flex gap-3">
                <button className="flex-1 py-2 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md flex items-center justify-center transition-all duration-200 border border-blue-100"
                  onClick={()=>openEditModalForm(category)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="flex-1 py-2 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md flex items-center justify-center transition-all duration-200 border border-red-100">
                  <Trash className="w-4 h-4 mr-2" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        {/* add new category modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setImageFilePreview(null);
          setShowModal(false);
        }}
        title="Add Category"
      >
        <form className="space-y-4" onSubmit={handleNewSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory.title}
              name="title"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter category name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value
            </label>
            <input
              type="text"
              value={newCategory.value}
              name="value"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter category name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              className="w-full"
              required
            />
          </div>
          {imageFilePreview && (
            <div className="mt-4">
              <p className="text-lg font-medium">Image Preview:</p>
              <div className="relative w-32 h-32">
                <X
                  className="text-white  bg-red-500 absolute right-1 hover:cursor-pointer hover:bg-red-400 rounded-full"
                  onClick={handleRemoveImage}
                ></X>
                <img
                  src={imageFilePreview}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isUploading ? "Uploading..." : "Add Category"}
          </button>
        </form>
      </Modal>
        {/* edit category modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
        }}
        title="Edit Category"
      >
        <form className="space-y-4 max-h-[80vh] overflow-y-auto" onSubmit={handleEditSubmit}> 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={editCategory.title}
              name="title"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter category name"
              onChange={handleEditInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value
            </label>
            <input
              type="text"
              value={editCategory.value}
              name="value"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter category name"
              onChange={handleEditInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              className="w-full"
            />
          </div>
          {(imageFilePreview || editCategoryImage) && (
            <div className="mt-4">
              <p className="text-lg font-medium">Image Preview:</p>
              <div className="relative w-32 h-32">
                <X
                  className="text-white  bg-red-500 absolute right-1 hover:cursor-pointer hover:bg-red-400 rounded-full"
                  onClick={handleRemoveImage}
                ></X>
                <img
                  src={imageFilePreview || editCategoryImage}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isUploading ? "Uploading..." : "Add Category"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesTab;
