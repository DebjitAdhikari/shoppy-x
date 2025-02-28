import { Trash2, X } from "lucide-react";

function Cart({setIsCartOpen,cartItems,totalItems,subtotal}) {
    
    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Shopping Cart ({totalItems})</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 bg-transparent hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li key={item.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                              <button className="text-gray-400 bg-transparent hover:text-gray-500">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">₹{item.price}</p>
                            <div className="mt-4 flex items-center">
                              <button className="p-1 rounded-md border bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50">-</button>
                              <span className="mx-4 text-gray-600">{item.quantity}</span>
                              <button className="p-1 rounded-md border bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50">+</button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-2 sm:px-4 py-6 sm:px-6">
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        className="flex-1 px-2 sm:px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-2 sm:px-4 py-2 bg-gray-900 text-white rounded-r-lg hover:bg-gray-800">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>₹{subtotal.toFixed(2)}</p>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Cart
