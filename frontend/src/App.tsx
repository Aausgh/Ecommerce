
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import PageNotFound from './pages/errors/NotFound'
import { ToastContainer } from 'react-toastify'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App