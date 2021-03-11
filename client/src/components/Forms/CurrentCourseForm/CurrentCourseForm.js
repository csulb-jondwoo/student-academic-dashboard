import React, { useState, useContext, useEffect } from 'react';
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
import useTrait from '../../../hooks/useTrait';

export const CurrentCourseForm = (props) => {
  const { addCurrentCourse, user } = useContext(myContext);

  const courseTypeTrait = useTrait('ge');
  const [courseType, setCourseType] = useState('ge');
  const courseNumber = useTrait(null);
  const courseTitle = useTrait(null);
  const courseUnits = useTrait(null);
  const courseTerm = useTrait('Fall');
  const courseYear = useTrait(null);
  const courseDesignation = useTrait(
    courseType === 'ge' ? 'A1 - Oral Communication' : 'Lower Div'
  );
  const courseAdditionalReq = useTrait('Human Diversity');
  const courseSection = useTrait(null);
  const courseStartTime = useTrait('00:00');
  const courseEndTime = useTrait('00:00');
  const courseDaysTrait = useTrait([]);
  const courseLocation = useTrait(null);
  const [timePickerStartTime, setTimePickerStartTime] = useState(0);
  const [timePickerEndTime, setTimePickerEndTime] = useState(0);
  const [courseDays, setCourseDays] = useState([]);

  const [courseData, setCourseData] = useState({
    userID: JSON.parse(user).googleId,
    type: 'ge',
    number: null,
    title: null,
    units: null,
    term: 'Fall',
    year: null,
    designation: courseType === 'ge' ? 'A1 - Oral Communication' : 'Lower Div',
    additionalReq: 'Human Diversity',
    section: null,
    startTime: '00:00',
    endTime: '00:00',
    days: [],
    location: null,
  });

  const getTime = (dateTime, seconds) => {
    const date = new Date(dateTime.getTime() + (seconds / 60) * 60000);
    let hour = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (hour.length === 1) {
      hour = '0' + hour;
    }

    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    const time = hour + ':' + minutes;
    return time;
  };

  const handleCourseTypeChange = (val) => {
    const newCourseType = courseTypeTrait.set(val);
    setCourseType(val);
    setCourseData({ ...courseData, type: newCourseType });
  };

  const handleCourseNumberChange = (e) => {
    const newCourseNumber = courseNumber.set(e.target.value);
    setCourseData({ ...courseData, number: newCourseNumber });
  };

  const handleCourseTitleChange = (e) => {
    const newCourseTitle = courseTitle.set(e.target.value);
    setCourseData({ ...courseData, title: newCourseTitle });
  };

  const handleCourseUnitChange = (e) => {
    const newCourseUnits = courseUnits.set(e.target.value);
    setCourseData({ ...courseData, units: newCourseUnits });
  };

  const handleCourseTermChange = (e) => {
    const newCourseTerm = courseTerm.set(e.target.value);
    setCourseData({ ...courseData, term: newCourseTerm });
  };

  const handleCourseYearChange = (e) => {
    const newCourseYear = courseYear.set(e.target.value);
    setCourseData({ ...courseData, year: newCourseYear });
  };

  const handleCourseDesignationChange = (e) => {
    const newCourseDesignation = courseDesignation.set(e.target.value);
    setCourseData({ ...courseData, designation: newCourseDesignation });
  };

  const handleCourseAdditionalReqChange = (e) => {
    const newCourseAdditionalReq = courseAdditionalReq.set(e.target.value);
    setCourseData({
      ...courseData,
      additionalReq: newCourseAdditionalReq,
    });
  };

  const handleCourseSectionChange = (e) => {
    const newCourseSection = courseSection.set(e.target.value);
    setCourseData({ ...courseData, section: newCourseSection });
  };

  const handleTimeStartChange = (seconds) => {
    const dateTime = new Date('July 1, 1999');

    // time in 24h string format
    const time = getTime(dateTime, seconds);
    setTimePickerStartTime(seconds);
    const newCourseStartTime = courseStartTime.set(time);
    setCourseData({ ...courseData, startTime: newCourseStartTime });
  };

  const handleTimeEndChange = (seconds) => {
    const dateTime = new Date('July 1, 1999');

    // time in 24h string format
    const time = getTime(dateTime, seconds);
    setTimePickerEndTime(seconds);
    const newCourseEndTime = courseEndTime.set(time);
    setCourseData({ ...courseData, endTime: newCourseEndTime });
  };

  const handleCourseDayChange = (days) => {
    const newCourseDays = courseDaysTrait.set(days);
    setCourseDays(days);
    setCourseData({ ...courseData, days: newCourseDays });
  };

  const handleCourseLocationChange = (e) => {
    const newCourseLocation = courseLocation.set(e.target.value);
    setCourseData({ ...courseData, location: newCourseLocation });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(courseData);
    addCurrentCourse(courseData);
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
                      {/* COURSE TYPE */}
                      <ToggleButtonGroup
                        className="mb-3"
                        type="radio"
                        name="options"
                        defaultValue="ge"
                        onChange={handleCourseTypeChange}
                      >
                        <ToggleButton value="ge">GE Course</ToggleButton>
                        <ToggleButton value="major">Major Course</ToggleButton>
                      </ToggleButtonGroup>

                      {/* COURSE NUMBER */}
                      <Form.Group controlId="courseNo">
                        <Form.Label>Course Number</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseNo"
                          onChange={handleCourseNumberChange}
                        />
                      </Form.Group>

                      {/* COURSE TITLE */}
                      <Form.Group controlId="courseTitle">
                        <Form.Label>Course Title</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseTitle"
                          onChange={handleCourseTitleChange}
                        />
                      </Form.Group>

                      {/* COURSE UNITS */}
                      <Form.Group controlId="courseUnits">
                        <Form.Label>Units</Form.Label>
                        <Form.Control
                          as="select"
                          name="courseUnits"
                          onChange={handleCourseUnitChange}
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
                          {/* COURSE TERM */}
                          <Form.Group controlId="courseTerm">
                            <Form.Label>Term</Form.Label>
                            <Form.Control
                              as="select"
                              name="courseTerm"
                              onChange={handleCourseTermChange}
                            >
                              <option value="Fall">Fall</option>
                              <option value="Spring">Spring</option>
                              <option value="Summer">Summer</option>
                              <option value="Winter">Winter</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          {/* COURSE YEAR */}
                          <Form.Group controlId="courseYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                              type="input"
                              name="courseYear"
                              onChange={handleCourseYearChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* COURSE DESIGNATION */}
                      {courseType === 'ge' ? (
                        // ge designation
                        <>
                          <Form.Group controlId="designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                              as="select"
                              name="designation"
                              onChange={handleCourseDesignationChange}
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

                          {/* Additional Req */}
                          <Form.Group controlId="additinalReq">
                            <Form.Label>Additional Requirements</Form.Label>
                            <Form.Control
                              as="select"
                              name="additionalReq"
                              onChange={handleCourseAdditionalReqChange}
                            >
                              <option value="Human Diversity" key={1}>
                                Human Diversity
                              </option>
                              <option value="Global Issues" key={2}>
                                Global Issues
                              </option>
                            </Form.Control>
                          </Form.Group>
                        </>
                      ) : (
                        // major designation
                        <Form.Group controlId="designation">
                          <Form.Label>Designation</Form.Label>
                          <Form.Control
                            as="select"
                            name="designation"
                            onChange={handleCourseDesignationChange}
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

                      {/* COURSE SECTION */}
                      <Form.Group controlId="section">
                        <Form.Label>Section</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseSection"
                          onChange={handleCourseSectionChange}
                        />
                      </Form.Group>

                      {/* COURSE START TIME */}
                      <Form.Group controlId="startTime">
                        <Form.Label>Start Time</Form.Label>
                        <TimePicker
                          onChange={handleTimeStartChange}
                          name="courseStartTime"
                          value={timePickerStartTime}
                          step={5}
                        />
                      </Form.Group>

                      {/* COURSE END TIME */}
                      <Form.Group controlId="endTime">
                        <Form.Label>End Time</Form.Label>
                        <TimePicker
                          onChange={handleTimeEndChange}
                          name="courseStartTime"
                          value={timePickerEndTime}
                          step={5}
                        />
                      </Form.Group>

                      {/* COURSE DAYS */}
                      <Form.Group controlId="day">
                        <Row>
                          <Col className="d-flex flex-column">
                            <Form.Label>Day</Form.Label>
                            <Container>
                              <ToggleButtonGroup
                                type="checkbox"
                                name="courseDays"
                                value={courseDays}
                                onChange={handleCourseDayChange}
                              >
                                <ToggleButton value="Mon">M</ToggleButton>
                                <ToggleButton value="Tues">T</ToggleButton>
                                <ToggleButton value="Wed">W</ToggleButton>
                                <ToggleButton value="Thurs">Th</ToggleButton>
                                <ToggleButton value="Fri">F</ToggleButton>
                                <ToggleButton value="Sat">S</ToggleButton>
                              </ToggleButtonGroup>
                            </Container>
                          </Col>
                        </Row>
                      </Form.Group>

                      {/* COURSE LOCATION */}
                      <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseLocation"
                          onChange={handleCourseLocationChange}
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
