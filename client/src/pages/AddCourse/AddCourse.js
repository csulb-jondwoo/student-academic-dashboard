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

  const handleCourseChange = (value) => {
    setRadioValue(value);
  };

  const handleProgressChange = (value) => {
    console.log(value);
    setIsComplete(value);
  };

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
                  handleChangeProgress={handleProgressChange}
                  courseType={radioValue}
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
