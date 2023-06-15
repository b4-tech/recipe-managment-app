import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import SignIn from './components/auth/SignInForm';
import SignUp from './components/auth/SignUpForm';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
            </Route>

          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
