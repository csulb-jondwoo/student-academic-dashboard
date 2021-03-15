import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';

import Navigation from './components/Navigation/Navigation';
import AppRoutes from './components/AppRoutes/AppRoutes';

import './App.css';

const App = () => {
  return (
    <ConfirmProvider>
      <Router>
        <Navigation />
        <Container>
          <AppRoutes />
        </Container>
      </Router>
    </ConfirmProvider>
  );
};

export default App;
