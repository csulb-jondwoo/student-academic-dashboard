import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { majorReqCategory } from '../../Requirements/MajorRequirements/CecsReqData';

const MajorForm = () => {
  return (
    <>
      <Form.Group controlId="course">
        <Form.Label>Course Number</Form.Label>
        <Form.Control type="input" />
      </Form.Group>

      <Form.Group controlId="courseTitle">
        <Form.Label>Course Title</Form.Label>
        <Form.Control type="input" />
      </Form.Group>

      <Form.Group controlId="units">
        <Form.Label>Units</Form.Label>
        <Form.Control as="select">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="term">
            <Form.Label>Term</Form.Label>
            <Form.Control as="select">
              <option>Fall</option>
              <option>Spring</option>
              <option>Summer</option>
              <option>Winter</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="term">
            <Form.Label>Year</Form.Label>
            <Form.Control type="input" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="grade">
        <Form.Label>Grade</Form.Label>
        <Form.Control as="select">
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
          <option>F</option>
          <option>CR</option>
          <option>NC</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="designation">
        <Form.Label>Designation</Form.Label>
        <Form.Control as="select">
          {majorReqCategory.map((category, idx) => {
            return <option key={idx}>{category}</option>;
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control as="select">
          <option>Complete</option>
          <option>In-Progress</option>
        </Form.Control>
      </Form.Group>

      <Button className="mt-3" variant="primary" type="submit">
        Submit
      </Button>
    </>
  );
};

export default MajorForm;
