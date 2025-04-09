import { useState } from "react";
import { Plus, X } from "lucide-react";

const CouponsTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [coupons, setCoupons] = useState([
    { id: 1, name: "SUMMER10", value: "10% OFF" },
    { id: 2, name: "WELCOME5", value: "₹50 OFF" },
    { id: 3, name: "FREESHIP", value: "Free Shipping" },
  ]);
  const [newCoupon, setNewCoupon] = useState({ name: "", value: "" });

  const handleAddCoupon = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      name: newCoupon.name,
      value: newCoupon.value,
    };
    setCoupons([...coupons, newEntry]);
    setNewCoupon({ name: "", value: "" });
    setShowModal(false);
  };

  return (
    <div className="px-4 sm:px-0">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Coupon
        </button>
      </div>

      {/* Coupon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col h-full border-t-4 border-blue-500"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {coupon.name}
            </h3>
            <p className="text-sm text-gray-600">{coupon.value}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <X
              className="absolute top-3 right-3 w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500"
              onClick={() => setShowModal(false)}
            />
            <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={newCoupon.name}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter coupon name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="text"
                  name="value"
                  required
                  value={newCoupon.value}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, value: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter discount/value"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsTab;
