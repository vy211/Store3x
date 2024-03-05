
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './components/Login/LoginPage';
import SignUp from './components/Login/SignUp';
import ForgotPassword from './components/Login/ForogotPass';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
import Header from './components/Header/Header';

function App() {
    

  return (
      <Router>
          <div>
             
              <Routes>
                  <Route path="/" element={<Home/> } />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  
              </Routes>
          </div>
      </Router>
  )
}

export default App
