import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import CurrentCourseDetailForm from '../CurrentCourseDetailForm/CurrentCourseDetailForm';
import { geReqData } from '../../Tables/Requirements/GeRequirements/GeReqData';
import { majorReqCategory } from '../../Tables/Requirements/MajorRequirements/CecsReqData';

// MAKE FIELDS REQUIRED
export const CourseDetailForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
        <Form.Group controlId="courseNo">
          <Form.Label>Course Number</Form.Label>
          <Form.Control 
            type="input"
            name="courseNo"
            value={props.courseData.courseNo}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="courseTitle">
          <Form.Label>Course Title</Form.Label>
          <Form.Control 
            type="input"
            name="courseTitle"
            value={props.courseData.courseTitle}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="courseUnits">
          <Form.Label>Units</Form.Label>
          <Form.Control 
            as="select"
            name="courseUnits"
            value={props.courseData.courseUnits}
            onChange={props.handleChange}
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
                value={props.courseData.courseTerm}
                onChange={props.handleChange}
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
                value={props.courseData.courseYear}
                onChange={props.handleChange}
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
              value={props.courseData.designation}
              onChange={props.handleChange}
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
              value={props.courseData.designation}
              onChange={props.handleChange}
            >
              {majorReqCategory.map((category, idx) => {
                return <option value={category} key={idx}>{category}</option>;
              })}
            </Form.Control>
          </Form.Group>
        )}

        {props.radioValue === 'ge' ? (
          <Form.Group controlId="additionalReq">
            <Form.Label>Additional Requirement</Form.Label>
            <Form.Control 
              as="select"
              name="additionalReq"
              value={props.courseData.additionalReq}
              onChange={props.handleChange}
            >
              <option value="N/A">N/A</option>
              <option value="Global Issues">Global Issues</option>
              <option value="Human Diversity">Human Diversity</option>
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
                onChange={props.handleProgressChange}
              >
                <ToggleButton value={true}>Complete</ToggleButton>
                <ToggleButton value={false}>In-Progress</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
        </Form.Group>

        {props.isComplete ? 
        <Form.Group controlId="courseGrade">
          <Form.Label>Grade</Form.Label>
          <Form.Control 
            as="select"
            name="courseGrade"
            value={props.courseData.courseGrade}
            onChange={props.handleChange}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
            <option value="CR">CR</option>
            <option value="NC">NC</option>
          </Form.Control>
        </Form.Group> : 
        <CurrentCourseDetailForm 
          handleChange={props.handleChange}
          handleStartTimeChange={props.handleStartTimeChange}
          handleEndTimeChange={props.handleEndTimeChange}
          handleDayChange={props.handleDayChange}
          courseSection={props.courseData.courseSection}
          courseStartTime={props.courseData.courseStartTime}
          courseEndTime={props.courseData.courseEndTime}
          courseDays={props.courseData.courseDays}
          courseLocation={props.courseData.courseLocation}
        />}
    </>
  );
};

export default CourseDetailForm;
