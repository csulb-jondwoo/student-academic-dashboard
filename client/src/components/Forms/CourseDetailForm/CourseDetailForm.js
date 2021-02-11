import React, { useState } from 'react';
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
  const [courseData, setCourseData] = useState({
    courseNo: "", 
    courseTitle: "", 
    courseUnits: "", 
    courseTerm: "", 
    courseYear: "", 
    designation: "", 
    reqs: "", 
    courseGrade: ""
  })

  /*
  handleSubmit = (e) => {
    e.preventDefault()
    setCourseData(prevData => )
  }
  */
  

  handleChange = (event) => {
    const {name, value} = event.target
    setCourseData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }
  
  return (
    <>
      <Form>
        <Form.Group controlId="courseNo">
          <Form.Label>Course Number</Form.Label>
          <Form.Control 
            type="input"
            name="courseNo"
            value={courseData.courseNo}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="courseTitle">
          <Form.Label>Course Title</Form.Label>
          <Form.Control 
            type="input"
            name="courseTitle"
            value={courseData.courseTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="courseUnits">
          <Form.Label>Units</Form.Label>
          <Form.Control 
            as="select"
            name="courseUnits"
            value={courseData.courseUnits}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="courseTerm">
              <Form.Label>Term</Form.Label>
              <Form.Control 
                as="select"
                name=""courseTerm
                value={courseData.courseTerm}
              >
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="courseYear">
              <Form.Label>Year</Form.Label>
              <Form.Control 
                type="input"
                name="courseYear"
                value={courseData.courseYear}
              />
            </Form.Group>
          </Col>
        </Row>

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

        <Form.Group controlId="courseStatus">
          <Form.Label>Status</Form.Label>
          <Row className="">
            <Col className="d-flex justify-content-center">
              <ToggleButtonGroup
                className="mb-3"
                type="radio"
                name="courseStatus"
                defaultValue="ge"
                onChange={handleChange}
              >
                <ToggleButton value={true}>Complete</ToggleButton>
                <ToggleButton value={false}>In-Progress</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
        </Form.Group>

        {isComplete ? 
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
        </Form.Group> : <CurrentCourseDetailForm />}

        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CourseDetailForm;
