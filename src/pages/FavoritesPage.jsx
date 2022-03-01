import { Card, CardHeader, CardMedia, Container, Grid } from '@mui/material';
import { getAuth } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';
import { useNavigate } from 'react-router-dom';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const { getFavorites, getRecipeData } = useContext(RecipeContext);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const favoritesIdArray = await getFavorites(auth.currentUser.uid);

      // create an array of data to fetch
      let fetchArray = [];
      favoritesIdArray.forEach((id) =>
        fetchArray.push(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
      );

      const responses = Promise.all(fetchArray.map((id) => fetch(id)));

      const responsesArray = await responses;
      // getting the array of recipes from the favorites
      let dataArray = [];
      for (const response of responsesArray) {
        const data = await response.json();

        dataArray.push(data);
      }
      setFavorites(dataArray);
    };

    fetchFavoriteRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (favoriteItem) => {
    await getRecipeData(favoriteItem.recipe_id);
    navigate(`/recipe-item/${favoriteItem.recipe_id}`);
    localStorage.setItem('recipe', JSON.stringify(favoriteItem.recipe_id));
  };

  // card image settings
  const cardImage = {
    padding: '1rem',
    transition: 'all .5s',
    cursor: 'pointer',

    '&:hover': {
      opacity: '0.8',
    },
  };

  if (!favorites) {
    return <h3>You have no favorites!</h3>;
  }

  return (
    <Container sx={{ width: '100%', paddingBottom: '15rem' }}>
      <Grid container>
        {favorites.map((favorite) => (
          <Grid
            sx={{ margin: '1rem' }}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Card
              sx={{
                margin: '1rem',
                display: 'flex',
                width: '100%',
                flexWrap: 'wrap',
                padding: '1rem',
              }}
            >
              <CardHeader
                title={favorite.recipe.title}
                subheader={favorite.recipe.publisher}
              />
              <CardMedia
                component="img"
                height="194"
                image={favorite.recipe.image_url}
                alt="Paella dish"
                sx={cardImage}
                onClick={() => handleClick(favorite.recipe)}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FavoritesPage;
