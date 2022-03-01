import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import RecipeItem from '../components/recipe/RecipeItem';
import RecipeContext from '../context/RecipeContext';

function RecipeList() {
  const { recipes } = useContext(RecipeContext);
  return (
    <>
      <Grid sx={{ paddingBottom: '15rem' }} container spacing={2}>
        {recipes &&
          recipes.map((recipe) => (
            <RecipeItem recipe={recipe} key={recipe.recipe_id} />
          ))}
      </Grid>
    </>
  );
}

export default RecipeList;
