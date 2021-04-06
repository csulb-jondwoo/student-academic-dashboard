import React, { useContext, useEffect, useState, useMemo } from 'react'
import MaterialTable from 'material-table'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import { useConfirm } from 'material-ui-confirm'

import formatTime from '../../../utility/formatTime/formatTime'
import { myContext } from '../../../context/Context'

import '../../../utility/css/table-fixed-height.css'

const CurrentSchedule = () => {
  const {
    user,
    currentCourses,
    getCurrentCourses,
    updateCurrentCourse,
    deleteCurrentCourse,
  } = useContext(myContext)

  const [isLoading, setIsLoading] = useState(true)
  const userID = JSON.parse(user).googleId
  const confirm = useConfirm()

  useEffect(() => {
    // set state of currentCourses inside context via reducer
    getCurrentCourses(userID)
    setIsLoading(false)
  }, [getCurrentCourses, userID, setIsLoading])

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
      lookup: {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
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

  // memoize courses so does not change on rerenders
  const courses = useMemo(
    () =>
      currentCourses.map((course) => {
        return {
          userID: userID,
          type: course.type,
          course: course.dept + ' ' + course.number + ' - ' + course.title,
          section: course.section,
          units: course.units,
          startTime: formatTime(course.startTime),
          endTime: formatTime(course.endTime),
          days: course.days.join('/'),
          location: course.location,
          designation: course.designation,
          additionalReq: course.additionalReq,
        }
      }),
    [currentCourses, userID],
  )

  // table rerendering bc tableData is changing
  const [tableData, setTableData] = useState(courses)

  useEffect(() => {
    setTableData(courses)
  }, [currentCourses, courses])

  const totalUnits = currentCourses.reduce((sum, obj) => {
    return sum + obj.units
  }, 0)

  const handleCourseUpdate = (newCourse, oldCourse) => {
    // change server side
    updateCurrentCourse({ newCourse, oldCourse })

    // change client side
    const dataUpdate = [...tableData]
    const index = oldCourse.tableData.id
    dataUpdate[index] = newCourse
    setTableData([...dataUpdate])
    setIsLoading(false)
  }

  const handleCourseDelete = (data) => {
    confirm({ description: 'Delete selected courses' })
      .then(() => {
        // change server side
        deleteCurrentCourse(data)
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

  const handleMarkAsComplete = (data) => {
    confirm({ description: 'Mark selected courses as complete' })
      .then(() => {
        // change server side

        // change client side
        setIsLoading(false)
      })
      .catch(() => {
        console.log('cancelled')
        setIsLoading(false)
      })
  }

  return (
    <MaterialTable
      title={`Current Schedule - Spring 2021 (${totalUnits} Units)`}
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
        {
          tooltip: 'Mark as Complete',
          icon: PlaylistAddCheckIcon,
          onClick: (evt, data) => {
            handleMarkAsComplete(data)
          },
        },
      ]}
    />
  )
}

export default CurrentSchedule
