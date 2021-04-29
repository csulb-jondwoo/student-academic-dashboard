import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import TimePicker from 'react-bootstrap-time-picker'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import useTrait from '../../../hooks/useTrait'
import { myContext } from '../../../context/Context'
import { geReqData } from '../../Tables/Requirements/GeRequirements/GeReqData'
import { majorReqCategory } from '../../Tables/Requirements/MajorRequirements/CecsReqData'
import MySnackbar from '../../../utility/MySnackbar/MySnackbar'

export const CurrentCourseForm = (props) => {
  const { addCurrentCourse, user } = useContext(myContext)

  // -------------------------------------------------------------------
  // TODO: possibly move to context or AddCourse component after refactoring
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [severity, setSeverity] = useState(null)
  const [error, setError] = useState(null)
  // -------------------------------------------------------------------

  const courseType = useTrait('ge')
  const courseStartTime = useTrait('06:00')
  const courseEndTime = useTrait('23:00')
  const courseDays = useTrait([])
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

  const formik = useFormik({
    initialValues: {
      courseNumber: '',
      courseDept: '',
      courseTitle: '',
      courseUnits: '',
      courseDesignation: '',
      courseAdditionalReq: '',
      courseSection: '',
      location: '',
    },
    validationSchema: Yup.object({
      courseNumber: Yup.string()
        .required('This field is required')
        .typeError('You must specify a number'),
      courseDept: Yup.string().required('This field is required'),
      courseTitle: Yup.string().required('This field is required'),
      courseUnits: Yup.string().required('This field is required'),
      courseSection: Yup.number().required('This field is required'),
      location: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      handleSubmit(values)
    },
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
        designation: 'Lower Div',
        additionalReq: null,
      })
    }
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

  // -----------------------------------------------------
  // TODO: possibly move to context
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  // -----------------------------------------------------

  const handleSubmit = async ({
    courseNumber,
    courseDept,
    courseTitle,
    courseUnits,
    courseDesignation,
    courseAdditionalReq,
    courseSection,
    location,
  }) => {
    if (courseType.get() === 'ge') {
      if (courseDesignation === '') {
        courseDesignation = 'A1 - Oral Communication'
      }
    } else {
      if (courseDesignation === '') {
        courseDesignation = 'Lower Div'
      }
    }

    if (courseAdditionalReq === '') {
      courseAdditionalReq = 'N/A'
    }

    courseData.set({ ...courseData.get(), number: courseNumber })
    courseData.set({ ...courseData.get(), dept: courseDept })
    courseData.set({ ...courseData.get(), title: courseTitle })
    courseData.set({ ...courseData.get(), units: courseUnits })
    courseData.set({ ...courseData.get(), designation: courseDesignation })
    courseData.set({ ...courseData.get(), additionalReq: courseAdditionalReq })
    courseData.set({ ...courseData.get(), section: courseSection })
    courseData.set({ ...courseData.get(), location: location })

    try {
      const res = await addCurrentCourse(courseData.get())
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

  return (
    <>
      <Container>
        <Row className="d-flex mt-5 justify-content-center">
          <Col md={9}>
            <Card className="text-center shadow-sm mb-3">
              <Card.Body>
                <Row className="my-2">
                  <Col className="d-flex justify-content-center">
                    <Form onSubmit={formik.handleSubmit}>
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
                      <Form.Group controlId="courseNumber">
                        <Form.Label>Course Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="courseNumber"
                          {...formik.getFieldProps('courseNumber')}
                        />
                      </Form.Group>
                      {formik.touched.courseNumber &&
                      formik.errors.courseNumber ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.courseNumber}
                        </div>
                      ) : null}

                      {/* COURSE DEPT */}
                      <Form.Group controlId="courseDept">
                        <Form.Label>Course Department</Form.Label>
                        <Form.Control
                          type="text"
                          name="courseDept"
                          {...formik.getFieldProps('courseDept')}
                        />
                      </Form.Group>
                      {formik.touched.courseDept && formik.errors.courseDept ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.courseDept}
                        </div>
                      ) : null}

                      {/* COURSE TITLE */}
                      <Form.Group controlId="courseTitle">
                        <Form.Label>Course Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="courseTitle"
                          {...formik.getFieldProps('courseTitle')}
                        />
                      </Form.Group>
                      {formik.touched.courseTitle &&
                      formik.errors.courseTitle ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.courseTitle}
                        </div>
                      ) : null}

                      {/* COURSE UNITS */}
                      <Form.Group controlId="courseUnits">
                        <Form.Label>Units</Form.Label>
                        <Form.Control
                          as="select"
                          name="courseUnits"
                          {...formik.getFieldProps('courseUnits')}
                        >
                          <option value=""></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </Form.Group>
                      {formik.touched.courseUnits &&
                      formik.errors.courseUnits ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.courseUnits}
                        </div>
                      ) : null}

                      {/* COURSE DESIGNATION */}
                      {courseType.get() === 'ge' ? (
                        // ge designation
                        <>
                          <Form.Group controlId="designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                              as="select"
                              name="designation"
                              {...formik.getFieldProps('courseDesignation')}
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
                          </Form.Group>

                          {/* Additional Req */}
                          <Form.Group controlId="additinalReq">
                            <Form.Label>Additional Requirements</Form.Label>
                            <Form.Control
                              as="select"
                              name="additionalReq"
                              {...formik.getFieldProps('courseAdditionalReq')}
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
                            {...formik.getFieldProps('courseDesignation')}
                          >
                            {majorReqCategory.map((category, idx) => {
                              return (
                                <option value={category} key={idx}>
                                  {category}
                                </option>
                              )
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
                          {...formik.getFieldProps('courseSection')}
                        />
                      </Form.Group>
                      {formik.touched.courseSection &&
                      formik.errors.courseSection ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.courseSection}
                        </div>
                      ) : null}
                      <Row>
                        <Col>
                          {/* COURSE START TIME */}
                          <Form.Group controlId="startTime">
                            <Form.Label>Start Time</Form.Label>

                            <TimePicker
                              start="06:00"
                              end="23:00"
                              name="courseStartTime"
                              value={timePickerStartTime}
                              step={5}
                              onChange={handleTimeStartChange}
                              onBlur={formik.handleBlur}
                            />
                          </Form.Group>
                          {formik.touched.startTime &&
                          formik.errors.startTime ? (
                            <div style={{ color: 'red' }}>
                              {formik.errors.startTime}
                            </div>
                          ) : null}
                        </Col>
                        <Col>
                          {/* COURSE END TIME */}
                          <Form.Group controlId="endTime">
                            <Form.Label>End Time</Form.Label>

                            <TimePicker
                              start="06:00"
                              end="23:00"
                              name="courseEndTime"
                              onChange={handleTimeEndChange}
                              value={timePickerEndTime}
                              step={5}
                              onBlur={formik.handleBlur}
                            />
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
                                onChange={handleCourseDayChange}
                                value={courseDays.get()}
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
                      {formik.touched.days && formik.errors.days ? (
                        <div style={{ color: 'red' }}>{formik.errors.days}</div>
                      ) : null}

                      {/* COURSE LOCATION */}
                      <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>

                        <Form.Control
                          type="input"
                          name="courseLocation"
                          {...formik.getFieldProps('location')}
                        />
                      </Form.Group>
                      {formik.touched.location && formik.errors.location ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.location}
                        </div>
                      ) : null}

                      <Button className="mt-3" variant="primary" type="submit">
                        Submit
                      </Button>

                      <MySnackbar
                        open={open}
                        severity={severity}
                        error={error}
                        success={success}
                        handleClose={handleClose}
                      />
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
