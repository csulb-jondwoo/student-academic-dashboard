import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import TimePicker from 'react-bootstrap-time-picker';
import Container from 'react-bootstrap/esm/Container';

const CurrentCourseDetailForm = () => {
  const [timeValue, setTimeValue] = useState({ time: 0 });
  const [dayValue, setDayValue] = useState([]);

  const handleTimeChange = (time) => {
    setTimeValue(time);
  };

  const handleDayChange = (val) => {
    setDayValue(val);
  };

  return (
    <>
      <Form.Group controlId="section">
        <Form.Label>Section</Form.Label>
        <Form.Control type="input" />
      </Form.Group>
      <Form.Group controlId="time">
        <Form.Label>Time</Form.Label>

        <TimePicker onChange={handleTimeChange} value={timeValue} step={5} />
      </Form.Group>
      <Form.Group controlId="day">
        <Row>
          <Col className="d-flex flex-column">
            <Form.Label>Day</Form.Label>
            <Container>
              <ToggleButtonGroup
                type="checkbox"
                value={dayValue}
                onChange={handleDayChange}
              >
                <ToggleButton value={1}>M</ToggleButton>
                <ToggleButton value={2}>T</ToggleButton>
                <ToggleButton value={3}>W</ToggleButton>
                <ToggleButton value={4}>Th</ToggleButton>
                <ToggleButton value={5}>F</ToggleButton>
                <ToggleButton value={6}>S</ToggleButton>
              </ToggleButtonGroup>
            </Container>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control type="input" />
      </Form.Group>
    </>
  );
};

export default CurrentCourseDetailForm;
