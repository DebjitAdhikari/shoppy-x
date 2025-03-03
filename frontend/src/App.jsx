import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import "./index.css"
import AppLayout from './components/AppLayout';
import Loader from './components/Loader';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import CategoryProducts from './pages/CategoryProducts';
import ContactUs from './pages/ContactUs';
import OffersPage from './pages/OffersPage';
import OrderDetails from './pages/OrderDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';


// const router=createBrowserRouter([
//   {
//     element:<AppLayout></AppLayout>,
//     errorElement:<ErrorPage></ErrorPage>,
//     children:[
//       {
//         path:"/",
//         element:<HomePage></HomePage>,
//       },
//       {
//         path:"/menu",
//         element:<Menu></Menu>,
//         errorElement:<ErrorPage></ErrorPage>,
//         loader:menuLoader,
//       },
//       { 
//         path:"/cart",
//         element:<Cart></Cart>
//       },
//       {
//         path:"/new-order",
//         element:<OrderForm></OrderForm>,
//         action:formAction
//       },
//       {
//         path:"/order/:orderId",
//         element:<OrderDetails></OrderDetails>,
//         loader:orderLoader
//       },
//       {
//         path:"/orders",
//         element:<OrderList></OrderList>
//       }
//     ]
//   }
// ])
// function App(){
//   return <RouterProvider router={router}>

//   </RouterProvider>
// }
const router = createBrowserRouter([
  {
    element:<AppLayout></AppLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:"/",
        element:<HomePage></HomePage>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/signup",
        element:<Signup></Signup>
      },
      {
        path:"/products/:id",
        element:<ProductDetails></ProductDetails>,
      },
      {
        path:"/loader",
        element:<Loader></Loader>
      },
      {
        path:"/categories",
        element:<Categories></Categories>
      },
      {
        path:"/offers",
        element:<OffersPage></OffersPage>
      },
      {
        path:"/contact",
        element:<ContactUs></ContactUs>
      },
      {
        path:"/categories/:category",
        element:<CategoryProducts></CategoryProducts>
      },
      {
        path:"/profile",
        element:<Profile></Profile>
      },
      {
        path:"/order/:orderId",
        element:<OrderDetails></OrderDetails>
      }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App

