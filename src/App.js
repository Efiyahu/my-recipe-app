import { Route, Routes } from 'react-router-dom';
import RecipeList from './pages/RecipeList';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { RecipeProvider } from './context/RecipeContext';
import IngredientsPage from './pages/IngredientsPage';
import About from './components/about/About';
import Container from '@mui/material/Container';
import FavoritesPage from './pages/FavoritesPage';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <RecipeProvider>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header />
        <Container>
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <h3
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    No search yet
                  </h3>
                }
              />
              <Route path="/recipe-list" element={<RecipeList />} />
              <Route
                path="/recipe-item/:recipeId"
                element={<IngredientsPage />}
              />
              <Route path="/favorites" element={<PrivateRoute />}>
                <Route path="/favorites" element={<FavoritesPage />} />
              </Route>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </Container>
        <Footer />
      </div>
      <ToastContainer />
    </RecipeProvider>
  );
}

export default App;
