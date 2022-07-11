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
import MyProfile from './components/MyProfile/MyProfile';
import MyRecipes from './components/MyRecipes/MyRecipes';


function App() {
const  [cards, setCards] = useState({});
  
  const setAllRecipes = useCallback((result) => {
    setCards(result);

  },[]);
  console.log(cards);



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
          <Route path='my-profile' element={<MyProfile/>}/>
          <Route path='my-recipes' element={<MyRecipes/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
