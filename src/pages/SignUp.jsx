import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ThemeProvider } from '@mui/system';
import { lightTheme } from '../components/lightTheme';
import { Button, Card, Container, TextField, Typography } from '@mui/material';
import './SignIn.styles.scss';

function SignUp() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = currentUser;

  const navigate = useNavigate();

  const onChange = (e) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp();
    navigate('/');
  };

  const signUp = async () => {
    try {
      const auth = getAuth();
      const userCridentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // signed in
      const user = userCridentials.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // remove the password before adding to database
      const userCopy = { ...currentUser };
      delete userCopy.password;
      userCopy.timeStamp = serverTimestamp();
      // adding user to database
      await setDoc(doc(db, 'users', user.uid), userCopy);
    } catch (error) {
      console.log(error.message);
    }
  };

  const cardColor = {
    margin: '1rem',
    padding: '.5rem',
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
                Sign Up
              </Typography>
              <TextField
                autoComplete="off"
                onChange={onChange}
                value={name}
                label="Name"
                id="name"
                variant="standard"
                size="small"
                sx={{ width: '100%', color: 'black', marginBottom: '1rem' }}
              />
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
                style={{ textDecoration: 'none', color: 'black' }}
                to="/sign-in"
              >
                Already have an account?
              </Link>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',
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

export default SignUp;
