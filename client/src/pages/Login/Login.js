import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaGoogle } from 'react-icons/fa';

import './Login.css';

const Login = () => {
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <Container>
      <Row className="d-flex mt-5 justify-content-center">
        <Col md={9}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Login to Student Academic Dashboard</Card.Title>
              <Button
                className="mb-3 mt-3"
                variant="primary"
                onClick={googleLogin}
              >
                <FaGoogle className="mb-1" /> Sign in with Google
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
