import './App.css';
import { Routes, Route,useNavigate, useLocation } from "react-router-dom";
import {Home}  from './pages/home/home.jsx';
import Auth from './pages/auth/Auth';
import {navigationRouter} from './helpers/navigation-router';
import {PrivateRoute} from './components/private-route';
function App() {
  navigationRouter.navigate = useNavigate();
  navigationRouter.location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route 
        path="/" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
