import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';

import * as api from '../../api';

import './Navigation.css';

const Navigation = ({ isLoggedIn, clearAuth }) => {
  const history = useHistory();

  const handleLogout = async () => {
    await api.googleLogout().then((res) => {
      if (res.data === 'done') {
        clearAuth();
        history.push('/login');
      }
    });
  };

  return (
    <Navbar className="nav-color" collapseOnSelect expand="lg" variant="light">
      <Container>
        <Navbar.Brand href="/dashboard">
          Student Academic Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/add-course">Add Course</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/roadmap">Roadmap</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
