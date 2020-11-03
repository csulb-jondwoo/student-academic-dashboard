import React, { Component } from "react"

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email = "",
            password = "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert("Form was submitted.");
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                </form>
            </div>
        )
    }
}