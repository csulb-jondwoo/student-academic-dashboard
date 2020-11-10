import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import DragAndDrop from '../../utility/components/DragAndDrop';

class NewStudent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Row className="d-flex mt-5 justify-content-center">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <h1>Welcome to the Student Academic Dashboard</h1>
              <p>
                In order for us to provide you a detailed description of your
                academic standing, we're going to need some information about
                your class history.
              </p>
              <p>
                New students are encouraged to upload a PDF file of their
                unofficial transcript. Students can also manually select their
                major from the dropdown menu below.
              </p>
              <DragAndDrop />

              <Form>
                <Form.Group controlId="exampleForm.majorSelect">
                  <Form.Label>Select a Major</Form.Label>
                  <Form.Control as="select" custom>
                    <option>Biology</option>
                    <option>Computer Science</option>
                    <option>Computer Engineering</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Zoology</option>
                    <option>Biology</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default NewStudent;
