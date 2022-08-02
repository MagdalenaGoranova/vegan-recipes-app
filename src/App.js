import { Route, Routes } from 'react-router-dom'; 

import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationsContext';

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
import Alerts from './components/Notifications/Alerts';
import Toasts from './components/Notifications/Toasts';
import PrivateRoute from './components/PrivateRoute';




function App() {

  return (
    <div className="App">

      <AuthProvider>
        <NotificationProvider>
        <Header />

        <Alerts/>
        <Toasts/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='all-recipes' element={<AllRecipes/>}/>
          <Route path='login' element={<Login/> }/>
          <Route path='register' element={<Register/>}/>
          
          <Route element={<PrivateRoute/>}>
            <Route path='create-recipe' element={<RecipeCreate/>}/>
            <Route path='recipe/details/:id' element={<RecipeDetails/>}/>
            <Route path='profile/:id' element={<Profile/>}/>
            <Route path='profile/:id/edit-profile' element={<ProfileEdit/>}/>
            <Route path='my-recipes' element={<MyRecipes/>}/>
            <Route path='recipe/edit/:id' element={<RecipeEdit/>}/>
          </Route>
        </Routes>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
