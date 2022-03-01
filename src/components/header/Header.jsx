import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { lightTheme } from '../lightTheme';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import { ThemeProvider } from '@mui/system';
import './Header.styles.scss';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import useAuthStatus from '../hooks/useAuthStatus';
function Header() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const { error, setError, getRecipes, signOutUser } =
    useContext(RecipeContext);
  const { loggedIn, setLoggedIn } = useAuthStatus();

  useEffect(() => {
    if (!error) {
      navigate('/recipe-list');
      setError(true);
    }
    console.log(error);
  }, [error, setError, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();

    getRecipes(input);

    // Removing the input
    setInput('');
  };

  const handleSignOut = () => {
    signOutUser();
    navigate('/');
    setLoggedIn((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ marginBottom: '1rem' }}>
          <Toolbar
            className="toolbar"
            variant="regular"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              className="title"
              onClick={() => navigate('/')}
              variant="h6"
              component="div"
              color="secondary"
              sx={{
                fontSize: '1.5rem',
                letterSpacing: '1px',
                cursor: 'pointer',
                paddingRight: '20px',
              }}
            >
              <RestaurantMenuIcon style={{ display: 'inline' }} />
              <span className="head-title">EatWithUs</span>
            </Typography>
            <form onSubmit={handleSubmit} className="form">
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                label="Standard"
                color="secondary"
                variant="outlined"
                size="small"
                sx={{ width: '250px', color: 'black' }}
              />
              <Button
                type="submit"
                color="secondary"
                sx={{ marginLeft: '.5rem' }}
                size="large"
              >
                Search
              </Button>
            </form>
            <div className="links">
              {loggedIn && (
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="small"
                  sx={{ marginRight: '1em' }}
                >
                  <Link
                    to="/favorites"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    Favorites
                  </Link>
                </Button>
              )}
              <Button
                sx={{ marginRight: '1em' }}
                color="secondary"
                size="small"
                variant="contained"
              >
                {!loggedIn ? (
                  <Link
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    to="/sign-in"
                  >
                    Login
                  </Link>
                ) : (
                  <p onClick={handleSignOut}>Logout</p>
                )}
              </Button>

              <Button color="secondary" variant="contained" size="small">
                <Link
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  to="/about"
                >
                  About
                </Link>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
