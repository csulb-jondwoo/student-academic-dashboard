import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import './Auth.css';

import Validator from './Validator';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
};

const Auth = () => {
  const [state, setState] = useState(initialValues);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e, inputPropName) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    updateValidators(inputPropName, e.target.value);
  };

  const isFormValid = () => {
    let status = true;
    Object.keys(Validator).forEach((field) => {
      if (!Validator[field].valid) {
        status = false;
      }
    });
    return status;
  };

  const displayValidationErrors = (fieldName) => {
    const validator = Validator[fieldName];
    const result = '';
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return (
          <span className="error" key={index}>
            * {info}
          </span>
        );
      });
      return <div className="error text-danger">{errors}</div>;
    }
    return result;
  };

  const resetValidators = () => {
    Object.keys(Validator).forEach((fieldName) => {
      Validator[fieldName].errors = [];
      Validator[fieldName].state = '';
      Validator[fieldName].valid = false;
    });
  };

  const updateValidators = (fieldName, value) => {
    Validator[fieldName].errors = [];
    Validator[fieldName].state = value;
    Validator[fieldName].valid = true;
    Validator[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          Validator[fieldName].errors.push(rule.message);
          Validator[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          Validator[fieldName].errors.push(rule.message);
          Validator[fieldName].valid = false;
        }
      }
    });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };
  const handleSubmit = (event) => {
    console.log('Form Submitted');
  };

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <Container>
      <Row className="d-flex mt-5 justify-content-center">
        <Col md={9}>
          <Card className="text-center shadow">
            <Card.Body>
              <Form className="formStyle" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={state.email}
                    onChange={(event) => handleChange(event, 'email')}
                    required
                  />
                </Form.Group>
                {displayValidationErrors('email')}

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={state.password}
                    onChange={(event) => handleChange(event, 'password')}
                    required
                  />
                </Form.Group>
                {displayValidationErrors('password')}

                {isSignUp ? (
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={state.confirmPassword}
                      onChange={(event) =>
                        handleChange(event, 'confirmPassword')
                      }
                      placeholder="Confirm Password"
                      required
                    />
                  </Form.Group>
                ) : null}
                {displayValidationErrors('confirmPassword')}

                <br />
                <Form.Check
                  type="switch"
                  id="Remember Me"
                  label="Remember Me"
                />
                <br />

                <Button
                  className="mb-3"
                  variant="primary"
                  disabled={!isFormValid()}
                  type="submit"
                >
                  Sign In
                </Button>
                <br />
                <GoogleLogin
                  clientId="86113368677-0bun4qab0haalfob041h38kruulbmvj4.apps.googleusercontent.com"
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                  render={(renderProps) => (
                    <Button
                      variant="primary"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Google Sign In
                    </Button>
                  )}
                />
                <br />
                <Link to={'/forgotPassword'}>Forgot Password?</Link>
                <br />
                <Link onClick={switchMode}>
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : 'Not yet registered? Sign up'}
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
