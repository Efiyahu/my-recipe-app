import { ThemeProvider } from '@emotion/react';
import {
  Card,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useContext, useEffect } from 'react';
import { lightTheme } from '../components/lightTheme';
import RecipeContext from '../context/RecipeContext';
import { v4 as uuidv4 } from 'uuid';

function IngredientsPage() {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  };
  const { currentRecipe, getRecipeData } = useContext(RecipeContext);

  useEffect(() => {
    const recipeId = localStorage.getItem('recipe');
    const parsed = JSON.parse(recipeId);
    const getRecipeFromLocalStorage = async () => {
      await getRecipeData(parsed);
    };

    getRecipeFromLocalStorage();

    // clear localStorage after component Unmounts
    return () => {
      localStorage.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Container sx={{ paddingBottom: '15rem' }}>
        {currentRecipe && (
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="300"
              image={currentRecipe.recipe.image_url}
              alt="Paella dish"
            />
            <CardHeader
              title={currentRecipe.recipe.title}
              subheader={`Publisher: ${currentRecipe.recipe.publisher}`}
            />

            <ul style={{ listStyle: 'none', fontFamily: 'inherit' }}>
              <Grid container spacing={2}>
                {currentRecipe.recipe.ingredients.map((ingredient, index) => (
                  <Grid key={uuidv4()} item xm={12} md={6} lg={4} xl={3}>
                    <Typography
                      sx={{ padding: '5px' }}
                      variant="li"
                      component="li"
                      color="secondary"
                    >
                      <strong>{index + 1}.</strong> {ingredient}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </ul>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default IngredientsPage;
