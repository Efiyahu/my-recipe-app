import React, { useContext, useState } from 'react';
import { Button, Card, Container, TextField, Typography } from '@mui/material';
import RecipeContext from '../context/RecipeContext';
import { ThemeProvider } from '@mui/system';
import { lightTheme } from '../components/lightTheme';
import { Link } from 'react-router-dom';
import './SignIn.styles.scss';

function SignIn() {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    password: '',
  });

  const { signIn } = useContext(RecipeContext);

  const onChange = (e) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const { email, password } = currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const cardColor = {
    margin: '1rem',
    padding: '.5rem',
    width: '100%',
  };

  const links = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  };

  return (
    <Container>
      <ThemeProvider theme={lightTheme}>
        <form
          onSubmit={handleSubmit}
          autoComplete="new-password"
          autoSave="off"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="form"
        >
          <Card sx={cardColor}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="card"
            >
              <Typography sx={{ marginBottom: '1rem' }} variant="h4">
                Sign In
              </Typography>
              <TextField
                autoComplete="off"
                onChange={onChange}
                value={email}
                label="Email"
                id="email"
                variant="standard"
                size="small"
                sx={{ width: '100%', color: 'black' }}
              />
              <TextField
                onChange={onChange}
                value={password}
                label="Password"
                type="password"
                id="password"
                variant="standard"
                size="small"
                sx={{ width: '100%', color: 'black', margin: '1rem 0 2rem 0' }}
              />
              <Button color="secondary" variant="contained" type="submit">
                Sign In
              </Button>
            </div>

            <div style={links} className="links">
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  '&:hover': {
                    color: 'crimson',
                  },
                }}
                to="/sign-up"
              >
                Don't have an account yet?{' '}
              </Link>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',

                  '&:hover': {
                    color: 'crimson',
                  },
                }}
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
          </Card>
        </form>
      </ThemeProvider>
    </Container>
  );
}

export default SignIn;
