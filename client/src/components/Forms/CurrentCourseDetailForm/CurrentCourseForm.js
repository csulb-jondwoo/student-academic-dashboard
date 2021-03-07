import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import TimePicker from 'react-bootstrap-time-picker';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';

import { myContext } from '../../../context/Context';
import { geReqData } from '../../Tables/Requirements/GeRequirements/GeReqData';
import { majorReqCategory } from '../../Tables/Requirements/MajorRequirements/CecsReqData';

export const CurrentCourseForm = (props) => {
  const { addCurrentCourse, user } = useContext(myContext);

  const [radioValue, setRadioValue] = useState('ge');
  const [startTimeValue, setStartTimeValue] = useState({ time: 0 });
  const [endTimeValue, setEndTimeValue] = useState({ time: 0 });
  const [dayValue, setDayValue] = useState([]);

  const [courseData, setCourseData] = useState({
    courseType: radioValue,
    courseNo: '',
    courseTitle: '',
    courseUnits: '',
    courseTerm: '',
    courseYear: '',
    designation: '',
    additionalReq: '',
    courseSection: '',
    courseStartTime: startTimeValue,
    courseEndTime: endTimeValue,
    courseDays: [],
    courseLocation: '',
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

  const handleStartTimeChange = (time) => {
    setStartTimeValue(time);
    setCourseData((prevData) => {
      return {
        ...prevData,
        courseStartTime: time,
      };
    });
  };

  const handleEndTimeChange = (time) => {
    setEndTimeValue(time);
    setCourseData((prevData) => {
      return {
        ...prevData,
        courseEndTime: time,
      };
    });
  };

  const handleDayChange = (val) => {
    setDayValue((prevDays) => [...prevDays, val]);
    setCourseData((prevData) => {
      return {
        ...prevData,
        courseDays: dayValue,
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

    const newCurrentCourse = {
      courseType: courseData.courseType,
      courseNo: courseData.courseNo,
      courseTitle: courseData.courseTitle,
      courseUnits: courseData.courseUnits,
      courseTerm: courseData.courseTerm,
      courseYear: courseData.courseYear,
      designation: courseData.designation,
      additionalReq: courseData.additionalReq,
      courseSection: courseData.courseSection,
      courseStartTime: courseData.courseStartTime,
      courseEndTime: courseData.courseEndTime,
      courseDays: courseData.courseDays,
      courseLocation: courseData.courseLocation,
    };
    addCurrentCourse(newCurrentCourse);
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
                                <option
                                  value={`${ge.designation} - ${ge.course}`}
                                  key={idx}
                                >
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
                              return (
                                <option value={category} key={idx}>
                                  {category}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                      )}
                      <Form.Group controlId="section">
                        <Form.Label>Section</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseSection"
                          value={courseData.courseSection}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="startTime">
                        <Form.Label>Start Time</Form.Label>
                        <TimePicker
                          onChange={handleStartTimeChange}
                          name="courseStartTime"
                          value={courseData.courseStartTime}
                          step={5}
                        />
                      </Form.Group>

                      <Form.Group controlId="endTime">
                        <Form.Label>End Time</Form.Label>
                        <TimePicker
                          onChange={handleEndTimeChange}
                          name="courseEndTime"
                          value={courseData.courseEndTime}
                          step={5}
                        />
                      </Form.Group>

                      <Form.Group controlId="day">
                        <Row>
                          <Col className="d-flex flex-column">
                            <Form.Label>Day</Form.Label>
                            <Container>
                              <ToggleButtonGroup
                                type="checkbox"
                                name="courseDays"
                                value={courseData.courseDays}
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
                        <Form.Control
                          type="input"
                          name="courseLocation"
                          value={courseData.courseLocation}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Button className variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CurrentCourseForm;
