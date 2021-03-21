import React, { useContext, useEffect, useMemo, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import { majorHistoryData } from './MajorHistoryData'

import '../../../../utility/css/table-fixed-height.css'
import { myContext } from '../../../../context/Context'
import formatTime from '../../../../utility/formatTime/formatTime'

const MajorHistory = () => {
  const { user, completedCourses, getCompletedCourses } = useContext(myContext)
  const [isLoading, setIsLoading] = useState(true)
  const userID = JSON.parse(user).googleId

  useEffect(() => {
    // set state of currentCourses inside context via reducer
    getCompletedCourses(userID)
    setIsLoading(false)
  }, [getCompletedCourses, userID, setIsLoading])

  const columns = [
    {
      title: 'Course',
      field: 'course',
      width: 1000,
    },
    {
      title: 'Section',
      field: 'section',
    },
    {
      title: 'Units',
      field: 'units',
    },
    {
      title: 'Start',
      field: 'startTime',
      cellStyle: {
        whiteSpace: 'nowrap',
      },
      width: 1000,
    },
    {
      title: 'End',
      field: 'endTime',
      cellStyle: {
        whiteSpace: 'nowrap', // history.push('dashboard');
      },
      width: 1000,
    },
    {
      title: 'Days',
      field: 'days',
    },
    {
      title: 'Location',
      field: 'location',
    },
  ]

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
    [completedCourses, userID],
  )

  console.log(courses)

  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>CECS History</Card.Title>
        </Card.Body>
      </Card>

      <div className="table-wrapper">
        <Table striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
              <th>Units</th>
              <th>Designation</th>
              <th>Term</th>
            </tr>
          </thead>
          <tbody>
            {majorHistoryData.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {course.course} - {course.title}
                  </td>
                  <td>{course.grade}</td>
                  <td>{course.units}</td>
                  <td>{course.designation}</td>
                  <td>{course.term}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default MajorHistory
