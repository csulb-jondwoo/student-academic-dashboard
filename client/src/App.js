import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import AppRoutes from './components/AppRoutes/AppRoutes';
import * as api from './api';

import './App.css';
import { myContext } from './context/Context';

const App = () => {
  const user = localStorage.getItem('user');

  const handleLogout = async () => {
    await api.googleLogout().then((res) => {
      if (res.data === 'done') {
        localStorage.clear();
        window.location.href = 'http://localhost:3000/login';
      }
    });
  };

  const handleLogin = async () => {
    window.location.href = 'http://localhost:5000/auth/google';
    // window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <>
      <Router>
        <Navigation user={user} handleLogout={handleLogout} />
        <Container>
          <AppRoutes user={user} handleLogin={handleLogin} />
        </Container>
      </Router>
    </>
  );
};

export default App;
