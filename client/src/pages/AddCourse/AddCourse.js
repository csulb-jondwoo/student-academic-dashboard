import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import CourseDetailForm from '../../components/Forms/CourseDetailForm/CourseDetailForm';

const AddCourse = () => {
  const [radioValue, setRadioValue] = useState('ge');
  const [isComplete, setIsComplete] = useState(true);
  const [courseData, setCourseData] = useState({
    courseType: radioValue,
    courseNo: "", 
    courseTitle: "", 
    courseUnits: "", 
    courseTerm: "", 
    courseYear: "", 
    designation: "", 
    additionalReq: "",
    courseStatus: isComplete,
    courseGrade: ""
  })
  
  const handleCourseChange = (value) => {
    setRadioValue(value);
    setCourseData(prevData => {
      return {
        ...prevData,
        courseType: radioValue
      }
    })
  };

  const handleProgressChange = (value) => {
    setIsComplete(value);
    setCourseData(prevData => {
      return {
        ...prevData,
        courseStatus: isComplete
      }
    })
  };

  const handleChange = (event) => {
    const {name, value} = event.target
    setCourseData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  return (
    <Container>
      <Row className="d-flex mt-5 justify-content-center">
        <Col md={9}>
          <Card className="text-center shadow mb-5">
            <Card.Body>
              <Row className="my-2">
                <Col className="d-flex justify-content-center">
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
                </Col>
              </Row>
              <Card.Title>Add {radioValue.toUpperCase()} Course</Card.Title>

              <Form>
                <CourseDetailForm
                  isComplete={isComplete}
                  radioValue={radioValue}
                  handleProgressChange={handleProgressChange}
                  handleChange={handleChange}
                  courseData={courseData}
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCourse;
