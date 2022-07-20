import { Route, Routes } from 'react-router-dom'; 
import { useCallback, useState} from "react";

import './App.css';
import * as recipeService from './services/recipeService';
import { AuthProvider } from './contexts/AuthContext';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AllRecipes from './components/AllRecipes/AllRecipes';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import MyRecipes from './components/MyRecipes/MyRecipes';
import RecipeEdit from './components/RecipeEdit/RecipeEdit';
import Profile from './components/Profile/Profile';
import ProfileEdit from './components/Profile/ProfileEdit';


function App() {
const  [cards, setCards] = useState({});
  
  const setAllRecipes = useCallback((result) => {
    setCards(result);

  },[]);
  



  return (
    <div className="App">

      <AuthProvider>
        <Header />
        <Routes>
          <Route path='home' element={<Home setAllRecipes={setAllRecipes} cards={cards}/>}/>
          <Route path='all-recipes' element={<AllRecipes setAllRecipes={setAllRecipes} cards={cards}/>}/>
          <Route path='login' element={<Login/> }/>
          <Route path='register' element={<Register/>}/>
          <Route path='create-recipe' element={<RecipeCreate recipeService={recipeService}/>}/>
          <Route path='recipe/details/:id' element={<RecipeDetails/>}/>
          <Route path='profile/:id' element={<Profile/>}/>
          <Route path='profile/:id/edit-profile' element={<ProfileEdit/>}/>
          <Route path='my-recipes' element={<MyRecipes/>}/>
          <Route path='recipe/edit/:id' element={<RecipeEdit/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
