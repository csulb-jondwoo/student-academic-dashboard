import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.css';

function Register() {
  return (
    <Form className="formStyle">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          Please enter your CSULB email address.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
        <Form.Text className="text-muted">
          Password must be between 8-20 characters in length.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="confirmPassword" placeholder="Confirm Password" />
        <Form.Text className="text-muted">
          Please confirm your password.
        </Form.Text>
      </Form.Group>

      <Form.Check type="switch" id="rememberMe" label="Remember Me" />
      <br />
      <Button className="btn" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Register;
