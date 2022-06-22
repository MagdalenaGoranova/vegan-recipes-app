import { Route, Routes } from 'react-router-dom'; 
import { useState, useEffect } from "react";

import './App.css';
import * as recipeService from './services/recipeService';
//import * as authService from './services/authService';
import { AuthContext } from './contexts/AuthContext';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AllRecipes from './components/AllRecipes/AllRecipes';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';


function App() {
const  [cards, setCards] = useState({});
const [user, setUser] = useState({
  accessToken: '',
  email: '',
  _id: ''
});

  useEffect(() => {
      recipeService.getAll()
          .then(result => {
              setCards(Object.values(Object.values(result)[0]));
              
          })
          .catch(err => {
              console.log(err);
          })
  }, []);

  const login = (authData) => {
    setUser(authData);
  }


  return (
    <div className="App">

      <AuthContext.Provider value={{user, login}}>
        <Header />
        <Routes>
          <Route path='home' element={<Home cards={cards}/>}/>
          <Route path='all-recipes' element={<AllRecipes cards={cards}/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register />}/>
          <Route path='create-recipe' element={<RecipeCreate />}/>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
