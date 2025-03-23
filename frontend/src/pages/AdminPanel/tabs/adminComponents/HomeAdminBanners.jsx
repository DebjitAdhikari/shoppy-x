import { AlertTriangle, Edit, Plus, Trash, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import getAllBanners from "../../../../services/homebanners/getAllBanners.js";
import createNewBanner from "../../../../services/homebanners/createNewBanner.js";
import Modal from "../../common/Modal.jsx";
import { Bounce, toast, ToastContainer } from "react-toastify";
import deleteBannerService from "../../../../services/homebanners/deleteBannerService.js";

function HomeAdminBanners() {
  //creation state
  const [banner, setBanner] = useState({
    heading: "",
    description: "",
  });
  const [bannerImageFile, setBannerImageFile] = useState(null);
  //
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting,setIsDeleting] = useState(false)
  // Modal state
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Editing state
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerIdToDelete, setBannerIdToDelete] = useState(null);

  // File upload references
  const bannerImageRef = useRef(null);

  // State for managing data
  const [allBanners, setAllBanners] = useState([]);

  // Image preview handling
  const [bannerImagePreview, setBannerImagePreview] = useState("");


  function successToast(message){
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
  }
  // File upload handlers
  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form when opening modal for new item
  const openBannerModal = (banner = null) => {
    setEditingBanner(banner);
    setBannerImagePreview("");
    setShowBannerModal(true);
  };
  //--------fetching functions are here ---------------------
  //get All the banners
  async function fetchAllBanners() {
    const { data } = await getAllBanners();
    setAllBanners(data);
  }
  //--------handling onchange functions are here -----------
  function handleNewBannerInputChange(e) {
    const { name, value } = e.target;
    setBanner((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }
  //--------handling functions are here --------------------
 
  async function handleBannerSubmit(e) {
    e.preventDefault();
    setIsAdding(true);
    const formData = new FormData();
    formData.append("heading", banner.heading);
    formData.append("description", banner.description);
    formData.append("image", bannerImageFile);
    try {
      const { data } = await createNewBanner(formData);
    //   console.log(data);
      setIsAdding(false);
      setShowBannerModal(false);
      successToast("New Banner added!")
      fetchAllBanners();
    } catch (err) {
      console.log(err);
    }
  }

  //open the modal for delete
  const openDeleteModal = ( id) => {
    setBannerIdToDelete( id );//banner with this id will be deleted
    setShowDeleteModal(true);//open 
  };
  //confirm the delete
  async function handleBannerDelete(){
    setIsDeleting(true)
    const data = await deleteBannerService(bannerIdToDelete)
    // console.log(data)
    setIsDeleting(false)
    setShowDeleteModal(false)
    fetchAllBanners()
    successToast("Banner deleted successfully")
  }
  useEffect(() => {
    //get and set the home banners
    fetchAllBanners();
  }, []);
  return (
    <>
      <section className="bg-white rounded-2xl shadow-md p-3 sm:p-6">
        <ToastContainer></ToastContainer>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Hero Banners</h2>
          <button
            onClick={() => openBannerModal()}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Banner
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBanners?.map((banner) => (
            <div
              key={banner._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={banner?.image.url}
                  alt={banner?.heading}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {banner?.heading}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {banner?.description}
                </p>
                <div className="flex gap-3 mt-4 justify-end">
                  <button
                    onClick={() => openBannerModal(banner)}
                    className="p-2 hover:bg-indigo-100 rounded-full transition-colors duration-200 text-indigo-600"
                    aria-label="Edit banner"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal( banner._id)}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors duration-200 text-red-600"
                    aria-label="Delete banner"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Banner Modal */}
      <Modal
        isOpen={showBannerModal}
        onClose={() => {
          setShowBannerModal(false);
          setEditingBanner(null);
          setBannerImagePreview("");
        }}
        title={editingBanner ? "Edit Banner" : "Add Banner"}
      >
        <form
          className="space-y-4 h-[70vh] overflow-y-auto"
          onSubmit={handleBannerSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              name="heading"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Enter banner heading"
              onChange={handleNewBannerInputChange}
              defaultValue={editingBanner?.heading}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              rows="3"
              placeholder="Enter banner description"
              onChange={handleNewBannerInputChange}
              defaultValue={editingBanner?.description}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Image
            </label>
            <div className="flex flex-col space-y-3">
              {(bannerImagePreview || editingBanner?.image.url) && (
                <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={bannerImagePreview || editingBanner?.image.url}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer group">
                <Upload className="w-5 h-5 mr-2 text-gray-500 group-hover:text-indigo-500 transition-colors" />
                <span>Upload Image</span>
                <input
                  ref={bannerImageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setBannerImagePreview)}
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {editingBanner ? "Update Banner" : isAdding?"Adding...":"Add Banner"}
          </button>
        </form>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setBannerIdToDelete(null);
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
              onClick={handleBannerDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
            {
                isDeleting?"Deleting...":"Delete"
            }
              
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HomeAdminBanners;
