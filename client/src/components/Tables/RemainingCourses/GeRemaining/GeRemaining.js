import React from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import '../../../../utility/css/table-fixed-height.css'
import getGeRemaining from './getGeRemaining/getGeRemaining'

const GeRemaining = ({ geCourses, majorCourses }) => {
  const {
    geRemaining,
    CAT_E,
    CAT_F,
    geEUnitCount,
    geFUnitCount,
  } = getGeRemaining(geCourses, majorCourses)

  return (
    <>
      {geCourses ? (
        <div className="shadow-sm">
          <Card>
            <Card.Body>
              <Card.Title>Remaining GE Courses</Card.Title>
            </Card.Body>
          </Card>
          <div className="table-wrapper">
            <Table striped hover bordered responsive="sm">
              <thead>
                <tr>
                  <th>COMMUNICATION & CRITICAL THINKING</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {geRemaining.map((course, idx) => {
                  if (course.designation.startsWith('A')) {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.designation} - {course.course}
                        </td>
                        <td>{course.units}</td>
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>SCIENCE & MATH</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {geRemaining.map((course, idx) => {
                  if (course.designation.startsWith('B')) {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.designation} - {course.course}
                        </td>
                        <td>{course.units}</td>
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>ARTS & HUMANITIES</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {geRemaining.map((course, idx) => {
                  if (course.designation.startsWith('C')) {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.designation} - {course.course}
                        </td>
                        <td>{course.units}</td>
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>SOCIAL SCIENCES & CITIZENSHIP</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {geRemaining.map((course, idx) => {
                  if (course.designation.startsWith('D')) {
                    return (
                      <tr key={idx}>
                        <td>
                          {course.designation} - {course.course}
                        </td>
                        <td>{course.units}</td>
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
                    LIFELONG LEARNING & SELF DEVELOPMENT ({CAT_E - geEUnitCount}{' '}
                    unit(s) left)
                  </th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {geRemaining.map((course, idx) => {
                  if (course.designation.startsWith('E')) {
                    return (
                      <tr key={idx}>
                        <td>{course.course}</td>
                        <td>{course.units}</td>
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>CAPSTONE ({CAT_F - geFUnitCount} unit(s) left)</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {geRemaining.map((course, idx) => {
                  if (course.designation.startsWith('F')) {
                    return (
                      <tr key={idx}>
                        <td>{course.course}</td>
                        <td>{course.units}</td>
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
              <thead>
                <tr>
                  <th>ADDITIONAL REQUIREMENTS</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {geRemaining.map((course, idx) => {
                  if (course.designation === 'Global Issues') {
                    return (
                      <tr key={idx}>
                        <td>{course.course}</td>
                        <td>{course.units}</td>
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
                {geRemaining.map((course, idx) => {
                  if (course.designation === 'Human Diversity') {
                    return (
                      <tr key={idx}>
                        <td>{course.course}</td>
                        <td>{course.units}</td>
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
        <p>leading...</p>
      )}
    </>
  )
}

export default GeRemaining
