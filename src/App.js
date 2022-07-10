import { Route, Routes } from 'react-router-dom'; 
import { useCallback, useState} from "react";

import './App.css';
import * as recipeService from './services/recipeService';
import { AuthContext } from './contexts/AuthContext';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AllRecipes from './components/AllRecipes/AllRecipes';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';


function App() {
const  [cards, setCards] = useState({});
const [user, setUser] = useState({
  accessToken: '',
  email: '',
  _id: ''
});

  const login = (authData) => {
    console.log(authData);
    setUser(authData);
  }
  const setAllRecipes = useCallback((result) => {
    setCards(result);

  },[]);
  console.log(cards);



  return (
    <div className="App">

      <AuthContext.Provider value={{user}}>
        <Header />
        <Routes>
          <Route path='home' element={<Home setAllRecipes={setAllRecipes} cards={cards}/>}/>
          <Route path='all-recipes' element={<AllRecipes setAllRecipes={setAllRecipes} cards={cards}/>}/>
          <Route path='login' element={<Login login={login}/> }/>
          <Route path='register' element={<Register login={login}/>}/>
          <Route path='create-recipe' element={<RecipeCreate recipeService={recipeService}/>}/>
          <Route path='recipe/details/:id' element={<RecipeDetails/>}/>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
