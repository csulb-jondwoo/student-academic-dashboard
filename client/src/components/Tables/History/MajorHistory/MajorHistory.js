import React, { useContext, useEffect, useMemo, useState } from 'react'
import MaterialTable from 'material-table'
import { useConfirm } from 'material-ui-confirm'

import { myContext } from '../../../../context/Context'
import '../../../../utility/css/table-fixed-height.css'

const MajorHistory = () => {
  const {
    user,
    completedCourses,
    getCompletedCourses,
    deleteCompletedCourse,
  } = useContext(myContext)

  const [isLoading, setIsLoading] = useState(true)
  const userID = JSON.parse(user).googleId
  const confirm = useConfirm()

  useEffect(() => {
    // set state of currentCourses inside context via reducer
    getCompletedCourses(userID)
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
      field: 'termYear',
      // cellStyle: {
      //   whiteSpace: 'nowrap', // history.push('dashboard');
      // },
      width: 500,
    },
  ]

  const courses = useMemo(
    () =>
      completedCourses
        .filter((course) => {
          return course.type === 'major'
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

    [completedCourses, userID],
  )

  const [tableData, setTableData] = useState(courses)

  useEffect(() => {
    setTableData(courses)
    setIsLoading(false)
  }, [completedCourses, courses])

  const handleCourseDelete = (data) => {
    confirm({ description: 'Delete selected courses' })
      .then(() => {
        // change server side
        deleteCompletedCourse(data)
        // change client side
        const valuesToRemove = []
        let dataDelete = [...tableData]
        for (const oldData of data) {
          valuesToRemove.push(oldData)
        }
        dataDelete = dataDelete.filter((i) => valuesToRemove.indexOf(i) === -1)
        setTableData([...dataDelete])
        setIsLoading(false)
      })
      .catch(() => {
        console.log('cancelled')
        setIsLoading(false)
      })
  }

  return (
    <MaterialTable
      title={'CECS Major History'}
      columns={columns}
      data={tableData}
      isLoading={isLoading}
      options={{
        selection: true,
        actionsColumnIndex: -1,
        emptyRowsWhenPaging: false,
      }}
      editable={{
        onRowUpdate: async (newCourse, oldCourse) =>
          new Promise((resolve, reject) => {
            setIsLoading(true)
            // handleCourseUpdate(newCourse, oldCourse)
            resolve()
          }),
      }}
      localization={{
        header: {
          actions: 'Edit',
        },
      }}
      actions={[
        {
          tooltip: 'Delete',
          icon: 'delete',
          onClick: (evt, data) => {
            handleCourseDelete(data)
          },
        },
      ]}
    />
  )
}

export default MajorHistory
