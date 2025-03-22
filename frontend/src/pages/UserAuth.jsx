import { Link, useNavigate } from "react-router-dom"
import checkLogin from "../services/users/checkLogin.js"
import { useEffect } from "react"

function UserAuth() {
    const navigate = useNavigate()
    async function checkIsLoggedIn() {
        const data = await checkLogin()
        if(data.data.status==="success")
          navigate("/profile")
      }
      useEffect(()=>{
        checkIsLoggedIn()
      },[])
        return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
           <div className="max-w-md w-full flex flex-col gap-6 bg-white p-8 shadow-lg sm:rounded-lg sm:px-10">
             <div className="text-center">
               <h2 className="text-3xl font-roboto font-extrabold text-gray-900">Start Ordering Today!</h2>
               <p className="mt-2 text-sm text-gray-600">
                 Create an account to unlock exclusive deals and faster checkout.
               </p>
                </div>
        
             <div className="flex flex-col gap-4">
               <Link
                 to="/login"
                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
               >
                 Login
               </Link>
        
               <Link
                 to="/signup"
                 className="w-full flex justify-center py-3 px-4 border border-blue-600 rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
               >
                 Sign Up
               </Link>
             </div>
           </div>
         </div>
    )
}

export default UserAuth
