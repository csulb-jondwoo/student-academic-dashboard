import React, { useContext, useEffect, useMemo } from 'react'
import Col from 'react-bootstrap/Col'

import GeRemaining from '../RemainingCourses/GeRemaining/GeRemaining'
import { myContext } from '../../../context/Context'
import MajorRemaining from './MajorRemaining/MajorRemaining'
import { majorReqCategory } from '../Requirements/MajorRequirements/CecsReqData'

const RemainingCourses = ({ type }) => {
  const {
    user,
    completedCourses,
    geCourses,
    majorCourses,
    getCompletedCourses,
    handleMajorRemainingUnits,
    handleGeRemainingUnits,
  } = useContext(myContext)
  // const userID = JSON.parse(user).googleId

  // useEffect(() => {
  //   // set state of currentCourses inside context via reducer
  //   getCompletedCourses(userID)
  // }, [getCompletedCourses, userID])

  // const geCourses = useMemo(
  //   () =>
  //     completedCourses
  //       .filter((course) => {
  //         return course.type === 'ge' && course.designation !== ''
  //       })
  //       .map((course) => {
  //         return {
  //           userID: userID,
  //           type: course.type,
  //           course: course.dept + ' ' + course.number + ' - ' + course.title,
  //           grade: course.grade,
  //           units: course.units,
  //           designation: course.designation,
  //           additionalReq: course.additionalReq,
  //           termYear: course.term + ' ' + course.year.toString(),
  //         }
  //       }),

  //   [completedCourses, userID]
  // )

  // const majorCourses = useMemo(
  //   () =>
  //     completedCourses
  //       .filter((course) => {
  //         return course.type === 'major' && course.designation !== ''
  //       })
  //       .map((course) => {
  //         return {
  //           userID: userID,
  //           type: course.type,
  //           course: course.dept + ' ' + course.number + ' - ' + course.title,
  //           grade: course.grade,
  //           units: course.units,
  //           designation: course.designation,
  //           additionalReq: course.additionalReq,
  //           termYear: course.term + ' ' + course.year.toString(),
  //         }
  //       }),

  //   [completedCourses, userID]
  // )

  return (
    <>
      {geCourses && majorCourses ? (
        <Col>
          {type === 'ge' ? (
            <GeRemaining
              geCourses={geCourses}
              majorCourses={majorCourses}
              handleGeRemainingUnits={handleGeRemainingUnits}
            />
          ) : (
            <MajorRemaining
              majorCourses={majorCourses}
              handleMajorRemainingUnits={handleMajorRemainingUnits}
            />
          )}
        </Col>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}

export default RemainingCourses
