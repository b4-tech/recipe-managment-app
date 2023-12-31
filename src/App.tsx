import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import SignIn from './components/auth/SignInForm';
import SignUp from './components/auth/SignUpForm';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './components/routes/PrivateRoute';
import RecipesGrid from './components/recipe/RecipesGrid';
import AddRecipe from './components/recipe/AddRecipe';
import SavedRecipes from './components/recipe/SavedRecipes';
import StartCooking from './components/cookingMode/StartCooking';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<RecipesGrid />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/addrecipe" element={<AddRecipe />} />
              <Route path="/savedrecipes" element={<SavedRecipes />} />
              <Route path="/start-cooking/:id" element={<StartCooking />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
