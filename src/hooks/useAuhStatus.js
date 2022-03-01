import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

const useAuthStatus = () => {
  const isMounted = useRef(true);
  const { setLoggedIn } = useContext(RecipeContext);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);

        return () => (isMounted.current = false);
      },
      [isMounted]
    );
  });
  return {
    checkingStatus,
  };
};
export default useAuthStatus;
