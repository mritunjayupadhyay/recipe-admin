import './App.scss';
import React from 'react';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';

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
import { authActions } from './store';
import { recipesActions } from './store/recipe.slice';
import { ingredientsActions } from './store/ingredient.slice';

function App() {
  navigationRouter.navigate = useNavigate();
  navigationRouter.location = useLocation();
  const { user } = useSelector(x => x.auth);
  const { error } = useSelector(x => x.recipes);
  const ingredientState = useSelector(x => x.ingredients);

  const dispatch = useDispatch();

  if (error || ingredientState.error) {
    Swal.fire({
      title: error || ingredientState.error,
      icon: 'error',
      confirmButtonText: 'OK',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(recipesActions.removeError());
        dispatch(ingredientsActions.removeError())
        if (error.toLowerCase() === 'token expired') {
          dispatch(authActions.logout());
        }
      }
    });
  }
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
          <Display />
        } />
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
