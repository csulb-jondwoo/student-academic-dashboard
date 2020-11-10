import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 *  Display the page to reset a password
 *  @author Ryan Stehle
 */
class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };

        /**
         * Change state of a given argument
         */
        this.handleChange = this.handleChange.bind(this);
        /** 
         * Handle submission of email 
         */
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log("Form Submitted")
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="formStyle">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    <Form.Control 
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={event => this.handleChange(event, 'email')}
                        placeholder="Enter email"
                        required
                    />
                    <Form.Text className="text-muted">
                        Please enter your email address. We'll send instructions to reset your password.
                    </Form.Text>
                </Form.Group>
                <Button type="submit">
                    Submit
                </Button>
                <br/>
                <Link to={"/login"}>Return to login</Link>
            </Form>
        )
    }
}

export default ForgotPassword