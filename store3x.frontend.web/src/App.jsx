
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPass'
function App() {
  

  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
      </Router>
  )
}

export default App
