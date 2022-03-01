import React from 'react';
import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardMedia, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { getAuth } from 'firebase/auth';
import useAuthStatus from '../hooks/useAuthStatus';

function RecipeItem({ recipe: { publisher, title, image_url, recipe_id } }) {
  const { loggedIn } = useAuthStatus();
  const cardColor = {
    margin: '1rem',
    padding: '.5rem',
    '&:hover': {
      backgroundColor: '#fffefc',
    },
  };

  const cardImage = {
    padding: '1rem',
    transition: 'all .5s',
    cursor: 'pointer',

    '&:hover': {
      opacity: '0.8',
    },
  };

  const handleFavorites = () => {
    const user = getAuth().currentUser;

    if (loggedIn) {
      addToFavorites(user.uid, recipe_id);
    }
  };

  const navigate = useNavigate();
  const { getRecipeData, addToFavorites } = useContext(RecipeContext);

  const handleClick = async () => {
    await getRecipeData(recipe_id);
    navigate(`/recipe-item/${recipe_id}`);
    localStorage.setItem('recipe', JSON.stringify(recipe_id));
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Card sx={cardColor}>
        <CardHeader title={title} subheader={publisher} />
        <CardMedia
          onClick={handleClick}
          component="img"
          height="194"
          sx={cardImage}
          image={image_url}
          alt="Paella dish"
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loggedIn && (
            <IconButton
              aria-label="add to favorites"
              onClick={handleFavorites}
              sx={{ margin: '.5rem 0' }}
            >
              <FavoriteIcon color="error" />
            </IconButton>
          )}
        </div>
      </Card>
    </Grid>
  );
}

export default RecipeItem;
