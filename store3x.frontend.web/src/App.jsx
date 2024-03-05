import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';


function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App
