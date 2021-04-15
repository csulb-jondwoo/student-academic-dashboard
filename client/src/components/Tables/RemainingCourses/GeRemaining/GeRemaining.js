import React, { useState, useEffect, useContext, useMemo } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import { geReqData } from '../../Requirements/GeRequirements/GeReqData/'
import { myContext } from '../../../../context/Context'

import '../../../../utility/css/table-fixed-height.css'
import { majorReqCategory } from '../../Requirements/MajorRequirements/CecsReqData'

const GeRemaining = ({ geCourses, majorCourses }) => {
  let geEUnitCount = 0
  let geFUnitCount = 0
  const CAT_E = 3
  const CAT_F = 9

  let geRemaining = []

  // check main requirements
  for (const requirement of geReqData) {
    let matched = false

    for (const course of geCourses) {
      if (
        course.designation === requirement.designation &&
        (course.grade === 'A' ||
          course.grade === 'B' ||
          course.grade === 'C' ||
          course.grade === 'CR')
      ) {
        matched = true
        break
      }
    }

    if (matched) {
      continue
    } else {
      geRemaining.push(requirement)
    }
  }

  // check additional requirements
  for (const course of geCourses) {
    if (
      course.additionalReq === 'Global Issues' ||
      course.additionalReq === 'Human Diversity'
    ) {
      geRemaining = geRemaining.filter((requirement) => {
        if (course.additionalReq === requirement.designation) {
          return false
        } else {
          return true
        }
      })
    }
  }

  // takes care of life science, physical science and lab exp
  for (const requirement of geRemaining) {
    for (const course of majorCourses) {
      if (course.designation === requirement.course) {
        const idx = geRemaining.findIndex(() => {
          return course.designation === requirement.course
        })
        // TODO: remove science and lab, may introduce error
        geRemaining.splice(idx, 2)
        break
      }
    }
  }

  // accumulate E and F units
  majorCourses.forEach((course) => {
    if (course.course.split(' -')[0] === 'CECS 105') {
      geEUnitCount += 1
    } else if (course.course.split(' -')[0] === 'ENGR 101') {
      geEUnitCount += 1
    } else if (course.course.split(' -')[0] === 'ENGR 102') {
      geEUnitCount += 1
    }
  })

  majorCourses.forEach((course) => {
    if (course.course.split(' -')[0] === 'CECS 491A') {
      geFUnitCount += 3
    } else if (course.course.split(' -')[0] === 'CECS 491B') {
      geFUnitCount += 3
    } else if (course.course.split(' -')[0] === 'ENGR 361') {
      geFUnitCount += 3
    } else if (course.course.split(' -')[0] === 'ENGR 390') {
      geFUnitCount += 3
    }
  })

  // check for correct amount of E and F units
  for (const requirement of geRemaining) {
    if (geEUnitCount === 3) {
      const idx = geRemaining.findIndex(() => {
        return requirement.designation === 'E'
      })
      geRemaining.splice(idx, 1)
    }
  }

  for (const requirement of geRemaining) {
    if (geFUnitCount === 9) {
      const idx = geRemaining.findIndex(() => {
        return requirement.designation === 'F'
      })
      geRemaining.splice(idx, 1)
    }
  }

  return (
    <>
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
                {/* <th>Units</th> */}
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
                <th>SCIENCE & MATH</th>
                {/* <th>Units</th> */}
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
                <th>ARTS & HUMANITIES</th>
                {/* <th>Units</th> */}
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
                <th>SOCIAL SCIENCES & CITIZENSHIP</th>
                {/* <th>Units</th> */}
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
                  LIFELONG LEARNING & SELF DEVELOPMENT ({CAT_E - geEUnitCount}{' '}
                  unit(s) left)
                </th>
                {/* <th>Units</th> */}
              </tr>
            </thead>
            <tbody>
              {geRemaining.map((course, idx) => {
                if (course.designation.startsWith('E')) {
                  return (
                    <tr key={idx}>
                      <td>{course.course}</td>
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
                <th>CAPSTONE ({CAT_F - geFUnitCount} unit(s) left)</th>
                {/* <th>Units</th> */}
              </tr>
            </thead>
            <tbody>
              {geRemaining.map((course, idx) => {
                if (course.designation.startsWith('F')) {
                  return (
                    <tr key={idx}>
                      <td>{course.course}</td>
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
                <th>ADDITIONAL REQUIREMENTS</th>
                {/* <th>Units</th> */}
              </tr>
            </thead>
            <tbody>
              {geRemaining.map((course, idx) => {
                if (course.designation === 'Global Issues') {
                  return (
                    <tr key={idx}>
                      <td>{course.course}</td>
                      {/* <td>{course.units}</td> */}
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
    </>
  )
}

export default GeRemaining
