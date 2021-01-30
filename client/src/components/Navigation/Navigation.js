import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import './Navigation.css';

const Navigation = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    //JWT...

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, location]);

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
            {user ? (
              <Nav.Link onClick={logout} href="#logout">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/auth">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
