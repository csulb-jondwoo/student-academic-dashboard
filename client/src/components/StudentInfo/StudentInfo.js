import React, { useContext, useEffect, useMemo, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Progress from '../../components/Progress/Progress'
import { myContext } from '../../context/Context'

const StudentInfo = () => {
  const [GPA, setGPA] = useState(undefined)
  const { user, completedCourses, getCompletedCourses } = useContext(myContext)
  const userID = JSON.parse(user).googleId
  const studentId = JSON.parse(user).studentId

  useEffect(() => {
    getCompletedCourses(userID)
  }, [getCompletedCourses, userID])

  const courses = useMemo(
    () =>
      completedCourses.map((course) => {
        return {
          userID: userID,
          type: course.type,
          course: course.dept + ' ' + course.number + ' - ' + course.title,
          grade: course.grade,
          units: course.units,
          designation: course.designation,
          additionalReq: course.additionalReq,
          termYear: course.term + ' ' + course.year.toString(),
        }
      }),

    [completedCourses, userID]
  )

  useEffect(() => {
    let points = 0
    let earned = 0
    const calculatePoints = (grade, units) => {
      switch (grade) {
        case 'A':
          return units * 4
        case 'B':
          return units * 3
        case 'C':
          return units * 2
        default:
          return 0
      }
    }
    const calculateEarned = (grade, units) => {
      switch (grade) {
        case 'A':
          return units
        case 'B':
          return units
        case 'C':
          return units
        default:
          return 0
      }
    }

    courses.forEach((course) => {
      points += calculatePoints(course.grade, course.units)
      earned += calculateEarned(course.grade, course.units)
    })

    const calculateGPA = () => {
      setGPA(points / earned)
    }

    calculateGPA()
  }, [courses])

  const renderTotalGpaTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Total GPA
    </Tooltip>
  )

  const renderCurrentGpaTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Current GPA
    </Tooltip>
  )

  const renderStudentIdTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Student ID
    </Tooltip>
  )

  return (
    <>
      {/* student info */}
      <div className="shadow-sm">
        <Row>
          <Col>
            <Card className="d-flex flex-row">
              <Col>
                <Card.Body>
                  <Card.Title>
                    {user ? JSON.parse(user).name : 123456789}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderStudentIdTooltip}
                    >
                      <span>{studentId === '0' ? '-' : studentId}</span>
                    </OverlayTrigger>
                  </Card.Subtitle>
                </Card.Body>
              </Col>
              <Col className="d-flex">
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="d-flex justify-content-end"
                    style={{ paddingRight: '1.2rem' }}
                  >
                    GPA
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted d-flex justify-content-end pr-2">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderCurrentGpaTooltip}
                    >
                      <span>{GPA ? GPA.toFixed(2) : '-'}</span>
                    </OverlayTrigger>
                    /
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTotalGpaTooltip}
                    >
                      <span>4.0</span>
                    </OverlayTrigger>
                  </Card.Subtitle>
                </Card.Body>
              </Col>
            </Card>
          </Col>
        </Row>
        <Progress />
      </div>
    </>
  )
}

export default StudentInfo
