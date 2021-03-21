import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import TimePicker from 'react-bootstrap-time-picker'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import useTrait from '../../../hooks/useTrait'
import { myContext } from '../../../context/Context'
import { geReqData } from '../../Tables/Requirements/GeRequirements/GeReqData'
import { majorReqCategory } from '../../Tables/Requirements/MajorRequirements/CecsReqData'
import MySnackbar from '../MySnackbar/MySnackbar'
import { Input } from '@material-ui/core'

export const CurrentCourseForm = (props) => {
  const { addCurrentCourse, user } = useContext(myContext)
  const [validated, setValidated] = useState(false)

  // -------------------------------------------------------------------
  // TODO: possibly move to context or AddCourse component after refactoring
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [severity, setSeverity] = useState(null)
  const [error, setError] = useState(null)
  // -------------------------------------------------------------------

  const courseType = useTrait('ge')
  const courseNumber = useTrait(0)
  const courseDept = useTrait('')
  const courseTitle = useTrait('')
  const courseUnits = useTrait(0)
  const courseDesignation = useTrait('A1 - Oral Communications')
  const courseAdditionalReq = useTrait('Human Diversity')
  const courseSection = useTrait(0)
  const courseStartTime = useTrait('06:00')
  const courseEndTime = useTrait('23:00')
  const courseDays = useTrait([])
  const courseLocation = useTrait('')
  const [timePickerStartTime, setTimePickerStartTime] = useState(21600) // start at 6am
  const [timePickerEndTime, setTimePickerEndTime] = useState(82800) // end at 11pm

  const courseData = useTrait({
    userID: JSON.parse(user).googleId,
    type: 'ge',
    number: 0,
    dept: '',
    title: '',
    units: 0,
    // hardcoded term and year
    term: 'Spring',
    year: 2021,
    designation: 'A1 - Oral Communication',
    additionalReq: '',
    section: 0,
    startTime: '06:00',
    endTime: '23:00',
    days: [],
    location: '',
  })

  const getTime = (dateTime, seconds) => {
    const date = new Date(dateTime.getTime() + (seconds / 60) * 60000)
    let hour = date.getHours().toString()
    let minutes = date.getMinutes().toString()

    if (hour.length === 1) {
      hour = '0' + hour
    }

    if (minutes.length === 1) {
      minutes = '0' + minutes
    }

    const time = hour + ':' + minutes
    return time
  }

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

  const handleCourseSectionChange = (e) => {
    const newCourseSection = courseSection.set(e.target.value)
    courseData.set({ ...courseData.get(), section: newCourseSection })
  }

  const handleTimeStartChange = (seconds) => {
    const dateTime = new Date('July 1, 1999')

    // time in 24h string format
    const time = getTime(dateTime, seconds)
    setTimePickerStartTime(seconds)
    const newCourseStartTime = courseStartTime.set(time)
    courseData.set({ ...courseData.get(), startTime: newCourseStartTime })
  }

  const handleTimeEndChange = (seconds) => {
    const dateTime = new Date('July 1, 1999')

    // time in 24h string format
    const time = getTime(dateTime, seconds)
    setTimePickerEndTime(seconds)
    const newCourseEndTime = courseEndTime.set(time)
    courseData.set({ ...courseData.get(), endTime: newCourseEndTime })
  }

  const handleCourseDayChange = (days) => {
    const newCourseDays = courseDays.set(days)
    courseData.set({ ...courseData.get(), days: newCourseDays })
  }

  const handleCourseLocationChange = (e) => {
    const newCourseLocation = courseLocation.set(e.target.value)
    courseData.set({ ...courseData.get(), location: newCourseLocation })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    try {
      const res = await addCurrentCourse(courseData.get())
      // why is res undefined
      if (res.data.success === true) {
        setSuccess(true)
        setSeverity('success')
        setOpen(true)
        setIsLoading(false)
        e.target.reset()
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
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
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
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a course number.
                        </Form.Control.Feedback>
                      </Form.Group>
                      {/* COURSE Dept */}
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
                              Please select a designation.
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
                              <option value="-" key={1}></option>
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
                            Please select a designation.
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                      {/* COURSE SECTION */}
                      <Form.Group controlId="section">
                        <Form.Label>Section</Form.Label>

                        <Form.Control
                          type="input"
                          name="courseSection"
                          onChange={handleCourseSectionChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a course section number.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Row>
                        <Col>
                          {/* COURSE START TIME */}
                          <Form.Group controlId="startTime">
                            <Form.Label>Start Time</Form.Label>

                            <TimePicker
                              onChange={handleTimeStartChange}
                              start="06:00"
                              end="23:00"
                              name="courseStartTime"
                              value={timePickerStartTime}
                              step={5}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a course starting time.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          {/* COURSE END TIME */}
                          <Form.Group controlId="endTime">
                            <Form.Label>End Time</Form.Label>

                            <TimePicker
                              onChange={handleTimeEndChange}
                              start="06:00"
                              end="23:00"
                              name="courseStartTime"
                              value={timePickerEndTime}
                              step={5}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a course ending time.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* COURSE DAYS */}
                      <Form.Group controlId="day">
                        <Row>
                          <Col className="d-flex flex-column">
                            <Form.Label>Day</Form.Label>

                            <Container>
                              <ToggleButtonGroup
                                type="checkbox"
                                name="courseDays"
                                value={courseDays.get()}
                                onChange={handleCourseDayChange}
                                required
                              >
                                <ToggleButton value="Mon">M</ToggleButton>
                                <ToggleButton value="Tues">T</ToggleButton>
                                <ToggleButton value="Wed">W</ToggleButton>
                                <ToggleButton value="Thurs">Th</ToggleButton>
                                <ToggleButton value="Fri">F</ToggleButton>
                                <ToggleButton value="Sat">S</ToggleButton>
                              </ToggleButtonGroup>
                            </Container>
                            <Form.Control.Feedback type="invalid">
                              Please select the day(s) the course takes place.
                            </Form.Control.Feedback>
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
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the course location.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* TODO: Implement loader */}
                      <Button
                        disabled={validated}
                        className="mt-3"
                        variant="primary"
                        type="submit"
                      >
                        Submit
                      </Button>

                      <MySnackbar
                        open={open}
                        severity={severity}
                        error={error}
                        success={success}
                        handleClose={handleClose}
                      />
                      {/* <MySnackbarButton disabled={!validated} /> */}
                      {/* <MySnackbarButton disabled={validated} /> */}
                    </Form>
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

export default CurrentCourseForm
