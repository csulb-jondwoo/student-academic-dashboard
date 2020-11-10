import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import CurrentCourseDetailForm from '../CurrentCourseDetailForm/CurrentCourseDetailForm';
import { geReqData } from '../../Tables/Requirements/GeRequirements/GeReqData';
import { majorReqCategory } from '../../Tables/Requirements/MajorRequirements/CecsReqData';

// MAKE FIELDS REQUIRED
export const CourseDetailForm = ({ isComplete, handleChange, courseType }) => {
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

      {courseType === 'ge' ? (
        // ge designation
        <Form.Group controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Control as="select">
            {geReqData.slice(0, 13).map((ge, idx) => {
              return (
                <option key={idx}>
                  {ge.designation} - {ge.course}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      ) : (
        // major category
        <Form.Group controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Control as="select">
            {majorReqCategory.map((category, idx) => {
              return <option key={idx}>{category}</option>;
            })}
          </Form.Control>
        </Form.Group>
      )}

      {courseType === 'ge' ? (
        <Form.Group controlId="additionalReq">
          <Form.Label>Additional Requirement</Form.Label>
          <Form.Control as="select">
            <option>N/A</option>
            <option>Global Issues</option>
            <option>Human Diversity</option>
          </Form.Control>
        </Form.Group>
      ) : null}

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Row className="">
          <Col className="d-flex justify-content-center">
            <ToggleButtonGroup
              className="mb-3"
              type="radio"
              name="options"
              defaultValue="ge"
              onChange={handleChange}
            >
              <ToggleButton value={true}>Complete</ToggleButton>
              <ToggleButton value={false}>In-Progress</ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Form.Group>

      {isComplete ? null : <CurrentCourseDetailForm />}

      <Button className="mt-3" variant="primary" type="submit">
        Submit
      </Button>
    </>
  );
};

export default CourseDetailForm;
