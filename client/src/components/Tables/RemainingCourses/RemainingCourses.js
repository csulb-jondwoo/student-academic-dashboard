import React, { useContext, useState, useEffect, useMemo } from 'react'
import Col from 'react-bootstrap/Col'

import GeRemaining from '../RemainingCourses/GeRemaining/GeRemaining'
import { myContext } from '../../../context/Context'

const RemainingCourses = ({ type }) => {
  const { user, completedCourses, getCompletedCourses } = useContext(myContext)
  const userID = JSON.parse(user).googleId

  useEffect(() => {
    // set state of currentCourses inside context via reducer
    getCompletedCourses(userID)
  }, [getCompletedCourses, userID])

  const geCourses = useMemo(
    () =>
      completedCourses
        .filter((course) => {
          return course.type === 'ge' && course.designation !== ''
        })
        .map((course) => {
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

  const majorCourses = useMemo(
    () =>
      completedCourses
        .filter((course) => {
          return course.type === 'major' && course.designation !== ''
        })
        .map((course) => {
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

  return (
    <>
      <Col>
        {type === 'ge' ? (
          <GeRemaining majorCourses={majorCourses} geCourses={geCourses} />
        ) : (
          '<MajorRemaining />'
        )}
      </Col>
    </>
  )
}

export default RemainingCourses
