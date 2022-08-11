import './App.scss';
import React from 'react';
import { Routes, Route,useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {Home}  from './pages/home/home.jsx';
import Auth from './pages/auth/Auth';
import {navigationRouter} from './helpers/navigation-router';
import {PrivateRoute} from './components/private-route';
import Edit from './pages/edit/edit';
import Display from './pages/display/display';
import Create from './pages/create/create';
import HorizontalNav from './components/navbar/HorizontalNav';
function App() {
  navigationRouter.navigate = useNavigate();
  navigationRouter.location = useLocation();
  const { user } = useSelector(x => x.auth);
  // const { authToken } = useSelector(x => x.auth);
  // if (authToken !== localStorage.getItem('authToken')) {
  //   useDispatch()
  // }
  return (
    <div className="App">
      <HorizontalNav show={!!user} />
      <Routes>
        <Route 
        path="/" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route 
        path="/create" 
        element={
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        } />
        <Route 
        path="/:recipeId/edit" 
        element={
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        } />
        <Route 
        path="/:recipeId" 
        element={
          <PrivateRoute>
            <Display />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
