import React, { useContext } from 'react'
import Col from 'react-bootstrap/Col'

import GeRemaining from '../RemainingCourses/GeRemaining/GeRemaining'
import { myContext } from '../../../context/Context'
import MajorRemaining from './MajorRemaining/MajorRemaining'

const RemainingCourses = ({ type }) => {
  const {
    geCourses,
    majorCourses,
    handleMajorRemainingUnits,
    handleGeRemainingUnits,
  } = useContext(myContext)

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
