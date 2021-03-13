import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';

import useTrait from '../../../hooks/useTrait';
import DragAndDrop from '../../../utility/DrapAndDrop/DragAndDrop';
import { geDesignations } from '../../Tables/Requirements/GeRequirements/geDesignations/';
import { cecsDesignations } from '../../Tables/Requirements/MajorRequirements/cecsDesignations/';
import { myContext } from '../../../context/Context';
import * as api from '../../../api';

// MAKE FIELDS REQUIRED
export const CompletedCourseForm = (props) => {
  const { addCompletedCourse, user } = useContext(myContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const courseType = useTrait('ge');
  const courseNumber = useTrait(null);
  const courseDept = useTrait(null);
  const courseTitle = useTrait(null);
  const courseUnits = useTrait(null);
  const courseTerm = useTrait('Fall');
  const courseYear = useTrait(null);
  const courseGrade = useTrait(null);
  const courseDesignation = useTrait('A1 - Oral Communications');
  const courseAdditionalReq = useTrait('Human Diversity');

  const courseData = useTrait({
    userID: JSON.parse(user).googleId,
    type: 'ge',
    number: null,
    dept: null,
    title: null,
    units: 0,
    term: 'Fall',
    year: null,
    grade: 'A',
    designation: 'A1 - Oral Communication',
    additionalReq: null,
  });

  const handleCourseTypeChange = (val) => {
    const newCourseType = courseType.set(val);
    if (val === 'ge') {
      courseData.set({
        ...courseData.get(),
        type: newCourseType,
        designation: 'A1 - Oral Communication',
        additionalReq: null,
      });
    } else {
      courseData.set({
        ...courseData.get(),
        type: newCourseType,
        designation: 'Lower div',
        additionalReq: null,
      });
    }
  };

  const handleCourseNumberChange = (e) => {
    const newCourseNumber = courseNumber.set(e.target.value);
    courseData.set({ ...courseData.get(), number: newCourseNumber });
  };

  const handleCourseDeptChange = (e) => {
    const newCourseDept = courseDept.set(e.target.value);
    courseData.set({ ...courseData.get(), dept: newCourseDept });
  };

  const handleCourseTitleChange = (e) => {
    const newCourseTitle = courseTitle.set(e.target.value);
    courseData.set({ ...courseData.get(), title: newCourseTitle });
  };

  const handleCourseUnitChange = (e) => {
    const newCourseUnits = courseUnits.set(e.target.value);
    courseData.set({ ...courseData.get(), units: newCourseUnits });
  };

  const handleCourseTermChange = (e) => {
    const newCourseTerm = courseTerm.set(e.target.value);
    courseData.set({ ...courseData.get(), term: newCourseTerm });
  };

  const handleCourseYearChange = (e) => {
    const newCourseYear = courseYear.set(e.target.value);
    courseData.set({ ...courseData.get(), year: newCourseYear });
  };

  const handleCourseGradeChange = (e) => {
    const newCourseGrade = courseGrade.set(e.target.value);
    courseData.set({ ...courseData.get(), grade: newCourseGrade });
  };

  const handleCourseDesignationChange = (e) => {
    const newCourseDesignation = courseDesignation.set(e.target.value);
    courseData.set({ ...courseData.get(), designation: newCourseDesignation });
  };

  const handleCourseAdditionalReqChange = (e) => {
    let newCourseAdditionalReq;

    if (e.target.value === '-') {
      newCourseAdditionalReq = courseAdditionalReq.set(null);
    } else {
      newCourseAdditionalReq = courseAdditionalReq.set(e.target.value);
    }
    courseData.set({
      ...courseData.get(),
      additionalReq: newCourseAdditionalReq,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: alert user
    console.log(courseData.get());
    addCompletedCourse(courseData.get());
  };

  const handleFileChange = (file) => {
    setSelectedFile(file[0]);
  };

  const handleUploadClick = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', selectedFile);
    api.uploadTranscript(data, JSON.parse(user).googleId);
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
                    {/* COURSE TYPE */}
                    <Form onSubmit={handleSubmit}>
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

                      {/* COURSE DEPT */}
                      <Form.Group controlId="courseDept">
                        <Form.Label>Course Department</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseDept"
                          onChange={handleCourseDeptChange}
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
                      {courseType.get() === 'ge' ? (
                        // ge designation
                        <>
                          <Form.Group controlId="designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                              as="select"
                              name="designation"
                              onChange={handleCourseDesignationChange}
                            >
                              {geDesignations.slice(0, 13).map((ge, idx) => {
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
                              <option value="-" key={1}>
                                -
                              </option>
                              <option value="Human Diversity" key={2}>
                                Human Diversity
                              </option>
                              <option value="Global Issues" key={3}>
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
                            {cecsDesignations.map((category, idx) => {
                              return (
                                <option value={category} key={idx}>
                                  {category}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                      )}

                      {/* COURSE GRADE */}
                      <Form.Group controlId="courseGrade">
                        <Form.Label>Grade</Form.Label>
                        <Form.Control
                          as="select"
                          name="courseGrade"
                          onChange={handleCourseGradeChange}
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

                      <Button className="mt-3" variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Col>
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
                <DragAndDrop handleFileChange={handleFileChange} />
                <Button
                  onClick={handleUploadClick}
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
    </>
  );
};

export default CompletedCourseForm;
