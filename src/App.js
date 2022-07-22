import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import {Home}  from './pages/home/home.jsx';
import { Login } from './pages/login/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
