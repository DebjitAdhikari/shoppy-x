import {useState, useEffect} from "react"
import { Trash2, X } from "lucide-react";
import checkLogin from "../services/users/checkLogin.js";
import { useNavigate } from "react-router-dom";
import getCartProductsService from "../services/cart/getCartProductsService.js";
import CartProduct from "./CartProduct.jsx";
import updateCartProductService from "../services/cart/updateCartProductService.js";
import deleteCartProductService from "../services/cart/deleteCartProductService.js";
import EmptyCart from "./EmptyCart.jsx";

function Cart({setIsCartOpen,}) {
  const [cartProducts,setCartProducts]=useState([])
  const [totalProducts,setTotalProducts]=useState(0)
  const [totalAmount,setTotalAmount]=useState(0)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const navigate = useNavigate()
  async function hasLoggedIn() {
    const data = await checkLogin()
    console.log("logged cart",data)
    if(data.status==="failed" && data.message==="Not Logged in"){
      setIsCartOpen(false)
      setIsLoggedIn(false)
      navigate("/userAuth")
    }else if(data.data.status==="success"){
      setIsCartOpen(true)
      setIsLoggedIn(true)
      setCartProducts(data.data.user.cart)
      setTotalAmount(data.data.user.cartAmount)
      setTotalProducts(data.data.user.cart.length)
    }
  }
  async function updateProductQuantity(id,formData){
    const data = await updateCartProductService(id,formData)
    setCartProducts(data.data.cart)
    setTotalAmount(data.data.cartAmount)
  }
  async function deleteCartProduct(id){
    const data = await deleteCartProductService(id)
    console.log(data)
    setCartProducts(data.data.cart)
    setTotalProducts(data.data.cart.length)
    setTotalAmount(data.data.cartAmount)
  }
  async function fetchAllCartProducts(){
    const {data} = await getCartProductsService()
    console.log(data.cart)
  }
  useEffect(()=>{
    hasLoggedIn()
    fetchAllCartProducts()
  },[])
    
    return (
      <>
      {
        isLoggedIn &&
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Shopping Cart ({totalProducts})</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 bg-transparent hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                {
                  cartProducts.length===0?<EmptyCart></EmptyCart>:
                  <>
              {/* cart with items */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200">
                      {cartProducts.map((item) => (
                        <CartProduct key={item._id} item={item} 
                        updateProductQuantity={updateProductQuantity}
                        deleteCartProduct={deleteCartProduct}></CartProduct>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-2 py-6 sm:px-6">
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
                    <p>₹{totalAmount}</p>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                    Proceed to Checkout
                  </button>
                </div>
                  
                  </>
                }

              </div>
            </div>
          </div>
        </div>
        
      }
      </>
    )
}

export default Cart
