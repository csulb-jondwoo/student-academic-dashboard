import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import LoginValidator from './LoginValidator';

import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };
    this.LoginValidator = LoginValidator;
    /**
     * Reset the validators value to default
     */
    this.resetValidators();

    /**
     * Update state of forms
     */
    this.handleChange = this.handleChange.bind(this);

    /**
     * Check email entered is in the database when we submit it
     * Check the password entered is correct for email entered
     */
    this.handleSubmit = this.handleSubmit.bind(this);

    /**
     * This function displays the validation errors for a given input field
     */
    this.displayValidationErrors = this.displayValidationErrors.bind(this);

    /**
     * Updates the state of the validators for specified validator
     */
    this.updateValidators = this.updateValidators.bind(this);

    /**
     * This function resets all validators for this form to the default state
     */
    this.resetValidators = this.resetValidators.bind(this);

    /**
     * This method checks to see if the validity of all validators are true
     */
    this.isFormValid = this.isFormValid.bind(this);
  }

  handleChange(event, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[inputPropName] = event.target.value;
    this.setState(newState);
    this.updateValidators(inputPropName, event.target.value);
  }

  isFormValid() {
    let status = true;
    Object.keys(this.LoginValidator).forEach((field) => {
      if (!this.LoginValidator[field].valid) {
        status = false;
      }
    });
    return status;
  }

  displayValidationErrors(fieldName) {
    const validator = this.LoginValidator[fieldName];
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
  }

  resetValidators() {
    Object.keys(this.LoginValidator).forEach((fieldName) => {
      this.LoginValidator[fieldName].errors = [];
      this.LoginValidator[fieldName].state = '';
      this.LoginValidator[fieldName].valid = false;
    });
  }

  updateValidators(fieldName, value) {
    this.LoginValidator[fieldName].errors = [];
    this.LoginValidator[fieldName].state = value;
    this.LoginValidator[fieldName].valid = true;
    this.LoginValidator[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.LoginValidator[fieldName].errors.push(rule.message);
          this.LoginValidator[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          this.LoginValidator[fieldName].errors.push(rule.message);
          this.LoginValidator[fieldName].valid = false;
        }
      }
    });
  }

  handleSubmit(event) {
    console.log('Form Submitted');
  }

  render() {
    return (
      <Container>
        <Row className="d-flex mt-5 justify-content-center">
          <Col md={9}>
            <Card className="text-center shadow">
              <Card.Body>
                <Form className="formStyle" onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={(event) => this.handleChange(event, 'email')}
                      required
                    />{' '}
                    {/* Might take this out.
                    <Form.Text className="text-muted">
                        Please enter your CSULB email address.
                    </Form.Text>*/}
                  </Form.Group>
                  {this.displayValidationErrors('email')}

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={this.state.password}
                      onChange={(event) => this.handleChange(event, 'password')}
                      required
                    />{' '}
                    {/* Might take this out.
                    <Form.Text className="text-muted">
                        Password must be between 8-20 characters in length.
                    </Form.Text> */}
                  </Form.Group>
                  {this.displayValidationErrors('password')}
                  <br />
                  <Form.Check
                    type="switch"
                    id="Remember Me"
                    label="Remember Me"
                  />
                  <br />
                  <Button
                    variant="primary"
                    disabled={!this.isFormValid()}
                    type="submit"
                  >
                    Sign In
                  </Button>
                  <br />
                  <Link to={'/forgotPassword'}>Forgot Password?</Link>
                  <br />
                  <Link to={'/register'}>Not yet registered? Sign up</Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
