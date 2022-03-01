const RecipeReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isLoggedIn: null,
      };
    case 'SEARCH_RECIPES':
      return {
        ...state,
        recipes: action.payload,
      };
    case 'SEARCH_BY_RECIPE_ID':
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default RecipeReducer;
