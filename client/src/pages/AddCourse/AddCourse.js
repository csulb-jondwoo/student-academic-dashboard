import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { myContext } from '../../context/Context';
import DragAndDrop from '../../utility/DragAndDrop';
import { CompletedCourseForm } from '../../components/Forms/CourseDetailForm/CompletedCourseForm';
import { CurrentCourseForm } from '../../components/Forms/CurrentCourseDetailForm/CurrentCourseForm';
import * as API from '../../api';

const AddCourse = () => {
  const [radioValue, setRadioValue] = useState('ge');
  const [isComplete, setIsComplete] = useState(true);
  const [startTimeValue, setStartTimeValue] = useState({ time: 0 });
  const [endTimeValue, setEndTimeValue] = useState({ time: 0 });
  const [dayValue, setDayValue] = useState([]);

  const { addCourse, user } = useContext(myContext);
  const googleID = JSON.parse(user).googleId;

  const [courseData, setCourseData] = useState({
    userID: googleID,
    courseType: radioValue,
    courseNo: '',
    courseTitle: '',
    courseUnits: '',
    courseTerm: '',
    courseYear: '',
    designation: '',
    additionalReq: '',
    courseStatus: isComplete,
    courseGrade: '',
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

  const handleProgressChange = (value) => {
    setIsComplete(value);
    setCourseData((prevData) => {
      return {
        ...prevData,
        courseStatus: isComplete,
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

    const newCourse = {
      userID: courseData.userID,
      courseType: courseData.courseType,
      courseNo: courseData.courseNo,
      courseTitle: courseData.courseTitle,
      courseUnits: courseData.courseUnits,
      courseTerm: courseData.courseTerm,
      courseYear: courseData.courseYear,
      designation: courseData.designation,
      additionalReq: courseData.additionalReq,
      courseStatus: courseData.courseStatus,
      courseGrade: courseData.courseGrade,
      courseSection: courseData.courseSection,
      courseStartTime: courseData.courseStartTime,
      courseEndTime: courseData.courseEndTime,
      courseDays: courseData.courseDays,
      courseLocation: courseData.courseLocation,
    };
    addCourse(newCourse);
  };

  const handleSubmitTranscript = () => {};

  return (
    <Container>
      <Row className="d-flex mt-5 justify-content-center">
        <Col md={9}>
          <Card className="text-center shadow-sm mb-3">
            <Card.Body>
              <Row className="my-2">
                <Col className="d-flex justify-content-center"></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
              <Button
                className
                onClick={handleSubmitTranscript}
                variant="primary"
                type="submit"
              >
                Add via transcript
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCourse;
