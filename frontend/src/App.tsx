
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import PageNotFound from './pages/errors/NotFound'
import Products from './pages/admin/Products'
import { ToastContainer } from 'react-toastify'
import SecureRoute from './routes/SecureRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
        
        <Route path="" element={<SecureRoute />}>
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
