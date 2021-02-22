import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import AppRoutes from './components/AppRoutes/AppRoutes';
import * as api from './api';

import './App.css';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));

  const handleLogout = async () => {
    await api.googleLogout().then((res) => {
      if (res.data === 'done') {
        localStorage.removeItem('user');
        window.location.href = 'http://localhost:3000/login';
      }
    });
  };

  return (
    <>
      <Router>
        <Navigation user={user} handleLogout={handleLogout} />
        <Container>
          <AppRoutes user={user} />
        </Container>
      </Router>
    </>
  );
};

export default App;
