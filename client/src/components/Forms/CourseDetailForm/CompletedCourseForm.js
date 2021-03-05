import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import DragAndDrop from '../../../utility/DragAndDrop'

import { geReqData } from '../../Tables/Requirements/GeRequirements/GeReqData';
import { majorReqCategory } from '../../Tables/Requirements/MajorRequirements/CecsReqData';

import { myContext } from '../../../context/Context'

// MAKE FIELDS REQUIRED
export const CompletedCourseForm = (props) => {
  const [radioValue, setRadioValue] = useState('ge');
  const { addCompletedCourse, user } = useContext(myContext);

  const [courseData, setCourseData] = useState({
    courseType: radioValue,
    courseNo: '',
    courseTitle: '',
    courseUnits: '',
    courseTerm: '',
    courseYear: '',
    designation: '',
    courseGrade: '',
  });

  const handleCourseChange = (value) => {
    setRadioValue(value);
    setCourseData((prevData) => {
      return {
        ...prevData,
        courseType: radioValue,
      };
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCompletedCourse = {
      courseType: courseData.courseType,
      courseNo: courseData.courseNo,
      courseTitle: courseData.courseTitle,
      courseUnits: courseData.courseUnits,
      courseTerm: courseData.courseTerm,
      courseYear: courseData.courseYear,
      designation: courseData.designation,
      courseGrade: courseData.courseGrade,
    };
    addCompletedCourse(newCompletedCourse);
  };

  return (
    <>
    <Container>
      <Row className="d-flex mt-5 justify-content-center">
        <Col md={9}>
          <Card className="text-center shadow-sm mb-3">
            <Card.Body>
              <Row className="my-2">
                <Col className="d-flex justify-content-center">
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <ToggleButtonGroup
          className="mb-3"
          type="radio"
          name="options"
          defaultValue="ge"
          onChange={handleCourseChange}
        >
          <ToggleButton value="ge">GE Course</ToggleButton>
          <ToggleButton value="major">Major Course</ToggleButton>
        </ToggleButtonGroup>

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
            onChange={handleChange}
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
                name="courseTerm"
                value={courseData.courseTerm}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {props.radioValue === 'ge' ? (
          // ge designation
          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control 
              as="select"
              name="designation"
              value={courseData.designation}
              onChange={handleChange}
            >
              {geReqData.slice(0, 13).map((ge, idx) => {
                return (
                  <option value={`${ge.designation} - ${ge.course}`}key={idx}>
                    {ge.designation} - {ge.course}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        ) : (
          // major designation
          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control 
              as="select"
              name="designation"
              value={courseData.designation}
              onChange={handleChange}
            >
              {majorReqCategory.map((category, idx) => {
                return <option value={category} key={idx}>{category}</option>;
              })}
            </Form.Control>
          </Form.Group>
        )}

        <Form.Group controlId="courseGrade">
          <Form.Label>Grade</Form.Label>
          <Form.Control 
            as="select"
            name="courseGrade"
            value={courseData.courseGrade}
            onChange={handleChange}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
            <option value="CR">CR</option>
            <option value="NC">NC</option>
          </Form.Control>
        </Form.Group>
        <Button 
          className="mt-3" 
          variant="primary" 
          type="submit"
        > Submit
        </Button>
      </Form>
      <Row className="d-flex justify-content-center">
        <Col md={9} className="d-flex justify-content-center">
          <p> - or - </p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={9}>
          <Card className="text-center shadow-sm mb-5">
            <Card.Body>
              <DragAndDrop />
              <Button className variant="primary" type="submit">
                Add via transcript
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default CompletedCourseForm;
