import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import AppRoutes from './components/AppRoutes/AppRoutes';

import './App.css';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container>
        <AppRoutes />
      </Container>
    </Router>
  );
};

export default App;
