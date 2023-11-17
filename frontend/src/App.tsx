
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
import ProductDetail from './pages/user/ProductDetail'

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
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<ProductDetail />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
