import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from "./pages/LoginPage"
import { AuthProvider } from "./context/AuthContext"
import HomePage from './pages/HomePage'
import ProfilePage from "./pages/ProfilePage"
import ProductsFormPage from "./pages/ProductsFormPage"

function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>

          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/products' element={<ProductsPage/>}/>
          <Route path='/add-product' element={<ProductsFormPage/>}/>
          <Route path='/product/:id' element={<ProductsFormPage/>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App