import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import './Navigation.css';
import { myContext } from '../../context/Context';

const Navigation = () => {
  const { user, handleLogout } = useContext(myContext);

  return (
    <Navbar className="nav-color" collapseOnSelect expand="lg" variant="light">
      <Container>
        <Navbar.Brand href="/dashboard">
          Student Academic Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <DropdownButton id="add_course" title="Add Course">
              <Dropdown.Item href="/add-current-course">
                Current Course
              </Dropdown.Item>
              <Dropdown.Item href="/add-completed-course">
                Completed Course
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
          <Nav>
            <Nav.Link href="/roadmap">Roadmap</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
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
