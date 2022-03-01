import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeReducer from './RecipeReducer';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const RecipeContext = React.createContext();

export const RecipeProvider = ({ children }) => {
  const [error, setError] = useState(true);
  const initialState = {
    isLoggedIn: null,
    recipes: [],
    currentRecipe: null,
  };
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  const navigate = useNavigate();
  const { isLoggedIn, recipes, currentRecipe } = state;

  // Set logged in user
  const signIn = async (email, password) => {
    try {
      const auth = getAuth();
      const userCridentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // signed in
      const user = userCridentials.user;
      if (user) {
        navigate('/');
      }
      dispatch({ type: 'SIGN_IN', payload: user });
    } catch (error) {
      console.log(error.message);
    }
  };

  // sign out
  const signOutUser = () => {
    getAuth().signOut();
    dispatch({
      type: 'SIGN_OUT',
    });
  };

  // get Recipes list by search input
  const getRecipes = async (query) => {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${query}`
      );

      const data = await response.json();

      dispatch({ type: 'SEARCH_RECIPES', payload: [...data.recipes] });
      setError(false);
    } catch (error) {
      toast.error(
        'Try a different search query (example: pizza, apple, broccoli) '
      );
      setError(true);
    }
  };

  const addToFavorites = async (userId, recipeItemId) => {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    dispatch({ type: 'ADD_TO_FAVORITES' });

    // add favorite to the firestore database
    if (docSnap.exists()) {
      const userFavorites = docSnap.data().favorites
        ? docSnap.data().favorites
        : [];
      await updateDoc(userRef, {
        favorites: [...userFavorites, recipeItemId].filter((item, index) => {
          return [...userFavorites, recipeItemId].indexOf(item) === index;
        }),
      });
    } else {
      console.log('could not add to Favorites');
    }
  };

  // get Favorites list
  const getFavorites = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    try {
      if (docSnap.exists()) {
        const userFavorites = docSnap.data().favorites
          ? docSnap.data().favorites
          : [];

        return [...userFavorites];
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // get data of specific recipe
  const getRecipeData = async (recipeId) => {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`
      );
      const data = await response.json();
      dispatch({ type: 'SEARCH_BY_RECIPE_ID', payload: { ...data } });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <RecipeContext.Provider
      value={{
        error,
        setError,
        isLoggedIn,
        recipes,
        signIn,
        getRecipes,
        signOutUser,
        getRecipeData,
        currentRecipe,
        addToFavorites,
        getFavorites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
