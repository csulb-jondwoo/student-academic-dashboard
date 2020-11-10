import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Register.css';
import RegisterValidator from './RegisterValidator';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    };
    this.RegisterValidator = RegisterValidator;

    /**
     * Resets form when navigating between views.
     */
    this.resetValidators();

    /**
     * Set state of the forms
     */
    this.handleChange = this.handleChange.bind(this);

    /**
     * Submit the forms
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

  updateValidators(fieldName, value) {
    this.RegisterValidator[fieldName].errors = [];
    this.RegisterValidator[fieldName].state = value;
    this.RegisterValidator[fieldName].valid = true;
    this.RegisterValidator[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.RegisterValidator[fieldName].errors.push(rule.message);
          this.RegisterValidator[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          this.RegisterValidator[fieldName].errors.push(rule.message);
          this.RegisterValidator[fieldName].valid = false;
        }
      }
    });
  }

  resetValidators() {
    Object.keys(this.RegisterValidator).forEach((fieldName) => {
      this.RegisterValidator[fieldName].errors = [];
      this.RegisterValidator[fieldName].state = '';
      this.RegisterValidator[fieldName].valid = false;
    });
  }

  displayValidationErrors(fieldName) {
    const validator = this.RegisterValidator[fieldName];
    const result = '';
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return (
          <span className="error" key={index}>
            * {info}
          </span>
        );
      });
      return <div className="error">{errors}</div>;
    }
    return result;
  }

  isFormValid() {
    let status = true;
    Object.keys(this.RegisterValidator).forEach((field) => {
      if (!this.RegisterValidator[field].valid) {
        status = false;
      }
    });
    return status;
  }

  handleChange(event, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[inputPropName] = event.target.value;
    this.setState(newState);
    this.updateValidators(inputPropName, event.target.value);
  }

  handleSubmit(event) {
    console.log('Placeholder Submit');
  }

  render() {
    return (
      <Container>
        <Row className="d-flex mt-5 justify-content-center">
          <Col md={9}>
            <Card className="text-center">
              <Card.Body>
                <Form onSubmit={this.handleSubmit} className="formStyle">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChange={(event) => this.handleChange(event, 'email')}
                      placeholder="Enter email"
                      required
                    />
                    {/* Might remove this.
          <Form.Text className="text-muted">
            Please enter your CSULB email address.
          </Form.Text> */}
                  </Form.Group>
                  {this.displayValidationErrors('email')}

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      id="password"
                      name="password"
                      value={this.state.password}
                      type="password"
                      placeholder="Enter password"
                      onChange={(event) => this.handleChange(event, 'password')}
                      required
                    />{' '}
                    {/* Might remove this.
          <Form.Text className="text-muted">
            Password must be between 8-20 characters in length.
          </Form.Text> */}
                  </Form.Group>
                  {this.displayValidationErrors('password')}

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={(event) =>
                        this.handleChange(event, 'confirmPassword')
                      }
                      placeholder="Confirm Password"
                      required
                    />{' '}
                    {/* Might remove this.
          <Form.Text className="text-muted">
            Please confirm your password.
          </Form.Text> */}
                  </Form.Group>
                  {this.displayValidationErrors('confirmPassword')}

                  <Form.Check
                    type="switch"
                    id="rememberMe"
                    label="Remember Me"
                  />
                  <br />
                  <Button
                    className="btn"
                    variant="primary"
                    type="submit"
                    disabled={!this.isFormValid()}
                  >
                    Sign Up
                  </Button>
                  <br />
                  <Link to={'/login'}>Already registered? Sign in</Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
