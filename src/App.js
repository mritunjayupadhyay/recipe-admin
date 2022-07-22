import './App.css';
import { Routes, Route } from "react-router-dom";
import {Home}  from './pages/home/home.jsx';
import Auth from './pages/auth/Auth';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
