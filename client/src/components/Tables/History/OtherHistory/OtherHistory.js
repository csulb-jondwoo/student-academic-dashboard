import React, { useContext, useEffect, useMemo, useState } from 'react'
import MaterialTable from 'material-table'
import { useConfirm } from 'material-ui-confirm'

import { myContext } from '../../../../context/Context'
import '../../../../utility/css/table-fixed-height.css'

const OtherHistory = () => {
  const {
    user,
    completedCourses,
    getCompletedCourses,
    updateCompletedCourse,
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
      lookup: {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        F: 'F',
        W: 'W',
        CR: 'CR',
        NC: 'NC',
      },
      width: 1000,
    },
    {
      title: 'Units',
      field: 'units',
      lookup: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
    {
      title: 'Designation',
      field: 'designation',
      lookup: {
        A1: 'A1',
        A2: 'A2',
        A3: 'A3',
        B1: 'B1',
        B2: 'B2',
        B3: 'B3',
        B4: 'B4',
        C1: 'C1',
        C2: 'C2',
        C3: 'C3',
        D1: 'D1',
        D2: 'D2',
        D3: 'D3',
        E: 'E',
        F: 'F',
        'Lower Div': 'Lower Div',
        'Physical Science': 'Physical Science',
        'Life Science': 'Life Science',
        'Upper Div': 'Upper Div',
        'Writing Intensive': 'Writing Intensive',
        'Core Elective': 'Core Elective',
        'Applied Elective': 'Applied Elective',
      },
      // cellStyle: {
      //   whiteSpace: 'nowrap',
      // },
      // width: 1000,
    },
    {
      title: 'Additional Req',
      field: 'additionalReq',
      lookup: {
        'N/A': 'N/A',
        'Global Issues': 'Global Issues',
        'Human Diversity': 'Human Diversity',
      },
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
          return course.designation === ''
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

  const [tableData, setTableData] = useState(courses)

  useEffect(() => {
    setTableData(courses)
    setIsLoading(false)
  }, [completedCourses, courses])

  const handleCourseUpdate = (newCourse, oldCourse) => {
    try {
      // change server side
      updateCompletedCourse({ newCourse, oldCourse })

      // change client side
      const dataUpdate = [...tableData]
      const index = oldCourse.tableData.id
      dataUpdate[index] = newCourse
      setTableData([...dataUpdate])
      setIsLoading(false)
    } catch (error) {
      // TODO: change to alert
      console.log(error)
    }
  }

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
      title={'Other History'}
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
            handleCourseUpdate(newCourse, oldCourse)
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

export default OtherHistory
