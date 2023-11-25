
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import PageNotFound from './pages/errors/NotFound'
import Products from './pages/admin/Products'
import { ToastContainer } from 'react-toastify'
import SecureRoute from './routes/SecureRoute'
import UserProducts from "./pages/user/Products";
import Home from './pages/user/Home'
import AdminRoute from "./routes/AdminRoute";
import ProductDetail from './components/user/ProductDetail'
import Cart from './components/user/Cart'
import CheckoutState from "./context/CheckoutState";
import ParentContainer from "./pages/user/ParentContainer";
import Success from "./pages/Success";
import Profile from './components/user/Profile'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="" element={<SecureRoute />}>
          <Route path="" element={<AdminRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>

          <Route path="/all/products" element={<UserProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout-step"
            element={
              <CheckoutState>
                <ParentContainer />
              </CheckoutState>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/payment/success" element={<Success />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
