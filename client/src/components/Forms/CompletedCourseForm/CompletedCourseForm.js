import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'

import useTrait from '../../../hooks/useTrait'
import CircularIntegration from './CircularIntegration/CircularIntegration'
import DragAndDrop from '../../../utility/DrapAndDrop/DragAndDrop'
import { geReqData } from '../../Tables/Requirements/GeRequirements/GeReqData'
import { majorReqCategory } from '../../Tables/Requirements/MajorRequirements/CecsReqData'
import { myContext } from '../../../context/Context'
import * as api from '../../../api'
import MySnackbar from '../MySnackbar/MySnackbar'

// MAKE FIELDS REQUIRED
export const CompletedCourseForm = (props) => {
  const { addCompletedCourse, user } = useContext(myContext)

  // -------------------------------------------------------------------
  // TODO: possibly move to context or AddCourse component after refactoring
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [severity, setSeverity] = useState(null)
  const [error, setError] = useState(null)
  // -------------------------------------------------------------------

  const [isTranscriptSubmit, setIsTranscriptSubmit] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [validated, setValidated] = useState(false)
  const courseType = useTrait('ge')
  const courseNumber = useTrait(0)
  const courseDept = useTrait('')
  const courseTitle = useTrait('')
  const courseUnits = useTrait(0)
  const courseTerm = useTrait('Fall')
  const courseYear = useTrait(0)
  const courseGrade = useTrait('')
  const courseDesignation = useTrait('A1 - Oral Communications')
  const courseAdditionalReq = useTrait('Human Diversity')

  const courseData = useTrait({
    userID: JSON.parse(user).googleId,
    type: 'ge',
    number: 0,
    dept: '',
    title: '',
    units: 0,
    term: 'Fall',
    year: 0,
    grade: 'A',
    designation: 'A1 - Oral Communication',
    additionalReq: '',
  })

  const handleCourseTypeChange = (val) => {
    const newCourseType = courseType.set(val)
    if (val === 'ge') {
      courseData.set({
        ...courseData.get(),
        type: newCourseType,
        designation: 'A1 - Oral Communication',
        additionalReq: null,
      })
    } else {
      courseData.set({
        ...courseData.get(),
        type: newCourseType,
        designation: 'Lower div',
        additionalReq: null,
      })
    }
  }

  const handleCourseNumberChange = (e) => {
    const newCourseNumber = courseNumber.set(e.target.value)
    courseData.set({ ...courseData.get(), number: newCourseNumber })
  }

  const handleCourseDeptChange = (e) => {
    const newCourseDept = courseDept.set(e.target.value)
    courseData.set({ ...courseData.get(), dept: newCourseDept })
  }

  const handleCourseTitleChange = (e) => {
    const newCourseTitle = courseTitle.set(e.target.value)
    courseData.set({ ...courseData.get(), title: newCourseTitle })
  }

  const handleCourseUnitChange = (e) => {
    const newCourseUnits = courseUnits.set(e.target.value)
    courseData.set({ ...courseData.get(), units: newCourseUnits })
  }

  const handleCourseTermChange = (e) => {
    const newCourseTerm = courseTerm.set(e.target.value)
    courseData.set({ ...courseData.get(), term: newCourseTerm })
  }

  const handleCourseYearChange = (e) => {
    const newCourseYear = courseYear.set(e.target.value)
    courseData.set({ ...courseData.get(), year: newCourseYear })
  }

  const handleCourseGradeChange = (e) => {
    const newCourseGrade = courseGrade.set(e.target.value)
    courseData.set({ ...courseData.get(), grade: newCourseGrade })
  }

  const handleCourseDesignationChange = (e) => {
    const newCourseDesignation = courseDesignation.set(e.target.value)
    courseData.set({ ...courseData.get(), designation: newCourseDesignation })
  }

  const handleCourseAdditionalReqChange = (e) => {
    let newCourseAdditionalReq

    if (e.target.value === '-') {
      newCourseAdditionalReq = courseAdditionalReq.set(null)
    } else {
      newCourseAdditionalReq = courseAdditionalReq.set(e.target.value)
    }
    courseData.set({
      ...courseData.get(),
      additionalReq: newCourseAdditionalReq,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)
    setIsTranscriptSubmit(false)

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    try {
      const res = await addCompletedCourse(courseData.get())
      // why is res undefined
      if (res.data.success === true) {
        setSuccess(true)
        setSeverity('success')
        setOpen(true)
        setIsLoading(false)
      }
    } catch (error) {
      setSeverity('error')
      setOpen(true)
      setError(error.message)
    }
  }

  const handleFileChange = (file) => {
    setSelectedFile(file[0])
  }

  const checkMimeType = (event) => {
    const file = selectedFile
    const type = 'application/pdf'
    if (file.type !== type) {
      throw new Error(`${file.type} is not a supported format`)
    }

    return true
  }

  // -----------------------------------------------------
  // TODO: possibly move to context
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  // -----------------------------------------------------

  const handleUploadClick = async (e) => {
    e.preventDefault()
    setSuccess(false)
    setIsTranscriptSubmit(true)

    try {
      checkMimeType(e)

      if (!isLoading) {
        setIsLoading(true)

        const formData = new FormData()

        formData.append('file', selectedFile)
        formData.append('userID', JSON.parse(user).googleId)

        // api not in context
        const res = await api.uploadTranscript(formData)

        if (res.data.success === true) {
          setSuccess(true)
          setSeverity('success')
          setOpen(true)
          setIsLoading(false)
          setSelectedFile(null)
        }
      }
    } catch (error) {
      setSeverity('error')
      setOpen(true)
      setError(error.message)
    }
  }

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
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
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
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a course number.
                        </Form.Control.Feedback>
                      </Form.Group>
                      {/* COURSE DEPT */}
                      <Form.Group controlId="courseDept">
                        <Form.Label>Course Department</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseDept"
                          onChange={handleCourseDeptChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the course department.
                        </Form.Control.Feedback>
                      </Form.Group>
                      {/* COURSE TITLE */}
                      <Form.Group controlId="courseTitle">
                        <Form.Label>Course Title</Form.Label>
                        <Form.Control
                          type="input"
                          name="courseTitle"
                          onChange={handleCourseTitleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the course title.
                        </Form.Control.Feedback>
                      </Form.Group>
                      {/* COURSE UNITS */}
                      <Form.Group controlId="courseUnits">
                        <Form.Label>Units</Form.Label>
                        <Form.Control
                          as="select"
                          name="courseUnits"
                          onChange={handleCourseUnitChange}
                          required
                        >
                          <option value=""></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please select the amount of units.
                        </Form.Control.Feedback>
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
                              required
                            >
                              <option value=""></option>
                              <option value="Fall">Fall</option>
                              <option value="Spring">Spring</option>
                              <option value="Summer">Summer</option>
                              <option value="Winter">Winter</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              Please enter a course section number.
                            </Form.Control.Feedback>
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
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter the year the course was taken.
                            </Form.Control.Feedback>
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
                              required
                            >
                              {geReqData.slice(0, 13).map((ge, idx) => {
                                return (
                                  <option
                                    value={`${ge.designation} - ${ge.course}`}
                                    key={idx}
                                  >
                                    {ge.designation} - {ge.course}
                                  </option>
                                )
                              })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              Please select a course designation.
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Additional Req */}
                          <Form.Group controlId="additinalReq">
                            <Form.Label>Additional Requirements</Form.Label>
                            <Form.Control
                              as="select"
                              name="additionalReq"
                              onChange={handleCourseAdditionalReqChange}
                              required
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
                            required
                          >
                            {majorReqCategory.map((category, idx) => {
                              return (
                                <option value={category} key={idx}>
                                  {category}
                                </option>
                              )
                            })}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please select a course designation.
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                      {/* COURSE GRADE */}
                      <Form.Group controlId="courseGrade">
                        <Form.Label>Grade</Form.Label>
                        <Form.Control
                          as="select"
                          name="courseGrade"
                          onChange={handleCourseGradeChange}
                          required
                        >
                          <option value=""></option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                          <option value="CR">CR</option>
                          <option value="NC">NC</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please select a grade for the course.
                        </Form.Control.Feedback>
                      </Form.Group>
                      {/* COURSE SUBMIT */}
                      {/* TODO: Implement loader */}
                      <Button
                        disabled={validated}
                        className="mt-3"
                        variant="primary"
                        type="submit"
                      >
                        Submit
                      </Button>

                      <Row className="mt-3 d-flex justify-content-center">
                        <Col md={9} className="d-flex justify-content-center">
                          <p> - or - </p>
                        </Col>
                      </Row>

                      {/* TRANSCRIPT SUBMIT */}
                      <Form.Group>
                        <DragAndDrop handleFileChange={handleFileChange} />
                      </Form.Group>
                      <CircularIntegration
                        handleButtonClick={handleUploadClick}
                        isLoading={isLoading}
                        success={success}
                        isTranscriptSubmit={isTranscriptSubmit}
                      />
                    </Form>

                    {/* ALERT */}
                    <MySnackbar
                      open={open}
                      severity={severity}
                      error={error}
                      success={success}
                      handleClose={handleClose}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CompletedCourseForm
