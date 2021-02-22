import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import { myContext } from './context/Context';
import AppRoutes from './components/AppRoutes/AppRoutes';

import './App.css';

const App = () => {
  const { auth, clearAuth } = useContext(myContext);
  return (
    <>
      <Router>
        <Navigation isLoggedIn={auth.isLoggedIn} clearAuth={clearAuth} />
        <Container>
          <AppRoutes />
        </Container>
      </Router>
    </>
  );
};

export default App;
