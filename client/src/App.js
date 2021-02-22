import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import AppRoutes from './components/AppRoutes/AppRoutes';
import * as api from './api';
import { myContext } from './context/Context';

import './App.css';

const App = () => {
  // const user = useContext(myContext);

  // const handleLogout = () => {
  //   api.googleLogout().then((res) => {
  //     if (res.data === 'done') {
  //       localStorage.clear();
  //       window.location.href = 'http://localhost:3000/login';
  //     }
  //   });
  // };

  // const handleLogin = () => {
  //   window.location.href = 'http://localhost:5000/auth/google';
  // };

  return (
    <>
      <Router>
        <Navigation />
        <Container>
          <AppRoutes />
        </Container>
      </Router>
    </>
  );
};

export default App;
