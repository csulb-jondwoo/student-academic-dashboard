import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import getMajorRemaining from './getMajorRemaining/getMajorRemaining'
import '../../../../utility/css/table-fixed-height.css'

const MajorRemaining = ({ majorCourses, handleMajorRemainingUnits }) => {
  const [remainingData, setRemainingData] = useState(undefined)

  useEffect(() => {
    const {
      majorRemaining,
      lowerDivUnitCount,
      approvedScienceUnitCount,
      upperDivUnitCount,
      writingIntensiveUnitCount,
      coreElectiveUnitCount,
      appliedElectiveUnitCount,
      LOWER_DIV_UNITS,
      APPROVED_SCIENCE_UNITS,
      UPPER_DIV_UNITS,
      WRITING_INTENSIVE_UNITS,
      CORE_ELECTIVE_UNITS,
      APPLIED_ELECTIVE_UNITS,
    } = getMajorRemaining(majorCourses)

    setRemainingData({
      majorRemaining,
      lowerDivUnitCount,
      approvedScienceUnitCount,
      upperDivUnitCount,
      writingIntensiveUnitCount,
      coreElectiveUnitCount,
      appliedElectiveUnitCount,
      LOWER_DIV_UNITS,
      APPROVED_SCIENCE_UNITS,
      UPPER_DIV_UNITS,
      WRITING_INTENSIVE_UNITS,
      CORE_ELECTIVE_UNITS,
      APPLIED_ELECTIVE_UNITS,
    })
  }, [majorCourses])

  // useEffect(() => {
  //   let unitsRemaining = 0

  //   if (remainingData) {
  //     unitsRemaining +=
  //       remainingData.LOWER_DIV_UNITS - remainingData.lowerDivUnitCount
  //     unitsRemaining +=
  //       remainingData.APPROVED_SCIENCE_UNITS -
  //       remainingData.approvedScienceUnitCount
  //     unitsRemaining +=
  //       remainingData.UPPER_DIV_UNITS - remainingData.upperDivUnitCount
  //     unitsRemaining +=
  //       remainingData.WRITING_INTENSIVE_UNITS -
  //       remainingData.writingIntensiveUnitCount
  //     unitsRemaining +=
  //       remainingData.CORE_ELECTIVE_UNITS - remainingData.coreElectiveUnitCount
  //     unitsRemaining +=
  //       remainingData.APPLIED_ELECTIVE_UNITS -
  //       remainingData.appliedElectiveUnitCount
  //   }

  //   handleMajorRemainingUnits(unitsRemaining)
  // }, [remainingData, handleMajorRemainingUnits])

  return (
    <>
      {remainingData ? (
        <div className="shadow-sm">
          <Card>
            <Card.Body>
              <Card.Title>Remaining CECS Courses</Card.Title>
            </Card.Body>
          </Card>
          <div className="table-wrapper">
            <Table striped hover bordered responsive="sm">
              <thead>
                <tr>
                  <th>
                    Lower Division (
                    {remainingData.LOWER_DIV_UNITS -
                      remainingData.lowerDivUnitCount}{' '}
                    unit(s) remaining)
                  </th>
                  {/* <th>Units</th> */}
                </tr>
              </thead>
              <tbody>
                {remainingData.majorRemaining.map((course, idx) => {
                  if (course.designation === 'Lower Div') {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.course} - {course.title}
                        </td>
                        {/* <td>{course.units}</td> */}
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>
                    Approved Science (
                    {remainingData.APPROVED_SCIENCE_UNITS -
                      remainingData.approvedScienceUnitCount}{' '}
                    unit(s) remaining)
                  </th>
                  {/* <th>Units</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan="2">
                    <em>PHYSICAL SCIENCE</em>
                  </th>
                </tr>
                {remainingData.majorRemaining.map((course, idx) => {
                  if (course.designation === 'Physical Science') {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.course} - {course.title}
                        </td>
                        {/* <td>{course.units}</td> */}
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
                <tr>
                  <th colSpan="2">
                    <em>LIFE SCIENCE</em>
                  </th>
                </tr>
                {remainingData.majorRemaining.map((course, idx) => {
                  if (course.designation === 'Life Science') {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.course} - {course.title}
                        </td>
                        {/* <td>{course.units}</td> */}
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>
                    Upper Division (
                    {remainingData.UPPER_DIV_UNITS -
                      remainingData.upperDivUnitCount}{' '}
                    unit(s) remaining)
                  </th>
                  {/* <th>Units</th> */}
                </tr>
              </thead>
              <tbody>
                {remainingData.majorRemaining.map((course, idx) => {
                  if (course.designation === 'Upper Div') {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.course} - {course.title}
                        </td>
                        {/* <td>{course.units}</td> */}
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>
                    Writing Intensive (
                    {remainingData.WRITING_INTENSIVE_UNITS -
                      remainingData.writingIntensiveUnitCount}{' '}
                    unit(s) remaining)
                  </th>
                  {/* <th>Units</th> */}
                </tr>
              </thead>
              <tbody>
                {remainingData.majorRemaining.map((course, idx) => {
                  if (course.designation === 'Writing Intensive') {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.course} - {course.title}
                        </td>
                        {/* <td>{course.units}</td> */}
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>
                    Core Elective (
                    {remainingData.CORE_ELECTIVE_UNITS -
                      remainingData.coreElectiveUnitCount}{' '}
                    unit(s) remaining)
                  </th>
                  {/* <th>Units</th> */}
                </tr>
              </thead>
              <tbody>
                {remainingData.majorRemaining.map((course, idx) => {
                  if (course.designation === 'Core Elective') {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.course} - {course.title}
                        </td>
                        {/* <td>{course.units}</td> */}
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>
                    Applied Elective (
                    {remainingData.APPLIED_ELECTIVE_UNITS -
                      remainingData.appliedElectiveUnitCount}{' '}
                    unit(s) remaining)
                  </th>
                  {/* <th>Units</th> */}
                </tr>
              </thead>
              <tbody>
                {remainingData.majorRemaining.map((course, idx) => {
                  if (course.designation === 'Applied Elective') {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.course} - {course.title}
                        </td>
                        {/* <td>{course.units}</td> */}
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}

export default MajorRemaining
