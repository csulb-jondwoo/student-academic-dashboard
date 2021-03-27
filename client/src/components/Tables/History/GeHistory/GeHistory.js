import React, { useState, useEffect, useContext, useMemo } from 'react'
import MaterialTable from 'material-table'

// import { geHistoryData } from './GeHistoryData'

import { myContext } from '../../../../context/Context.js'

import '../../../../utility/css/table-fixed-height.css'

const GeHistory = () => {
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
      cellStyle: {
        whiteSpace: 'nowrap',
      },
    },
    {
      title: 'Grade',
      field: 'grade',
      width: 1000,
    },
    {
      title: 'Units',
      field: 'units',
    },
    {
      title: 'Designation',
      field: 'designation',
      // cellStyle: {
      //   whiteSpace: 'nowrap',
      // },
      // width: 1000,
    },
    {
      title: 'Term',
      field: 'term',
      // cellStyle: {
      //   whiteSpace: 'nowrap', // history.push('dashboard');
      // },
      // width: 1000,
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

  const [tableData, setTableData] = useState(courses)

  useEffect(() => {
    setTableData(courses)
  }, [completedCourses, courses])

  // console.log(courses)

  return (
    <MaterialTable
      title={'CECS History'}
      columns={columns}
      data={tableData}
      isLoading={isLoading}
      options={{
        selection: true,
        actionsColumnIndex: -1,
        emptyRowsWhenPaging: false,
      }}
      // editable={{
      //   onRowUpdate: async (newCourse, oldCourse) =>
      //     new Promise((resolve, reject) => {
      //       setIsLoading(true)
      //       handleCourseUpdate(newCourse, oldCourse)
      //       resolve()
      //     }),
      // }}
      localization={{
        header: {
          actions: 'Edit',
        },
      }}
      actions={[
        {
          tooltip: 'Delete',
          icon: 'delete',
          // onClick: (evt, data) => {
          //   handleCourseDelete(data)
          // },
        },
      ]}
    />
  )
}

export default GeHistory
