import '../../../utility/css/table-fixed-height.css'

import MaterialTable from 'material-table'
import { useConfirm } from 'material-ui-confirm'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Menu, MenuItem } from '@material-ui/core'

import { myContext } from '../../../context/Context'
import DialogSelect from '../../../utility/DialogSelect/DialogSelect'
import formatTime from '../../../utility/formatTime/formatTime'
import { addCompletedCourse } from '../../../api'

const CurrentSchedule = () => {
  const {
    user,
    currentCourses,
    getCurrentCourses,
    updateCurrentCourse,
    deleteCurrentCourse,
  } = useContext(myContext)

  const [courseData, setCourseData] = useState({})

  const [currentTerm, setCurrentTerm] = useState('Spring')
  const [currentYear, setCurrentYear] = useState(2021)
  const [isLoading, setIsLoading] = useState(true)
  const [courseTitle, setCourseTitle] = useState(undefined)
  const [grade, setGrade] = useState('')
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedRow, setSelectedRow] = useState(undefined)

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
      cellStyle: {
        whiteSpace: 'nowrap',
      },
    },
    {
      title: 'section',
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
    },
    {
      title: 'End',
      field: 'endTime',
      cellStyle: {
        whiteSpace: 'nowrap',
      },
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
      currentCourses.map((course) => ({
        userID,
        type: course.type,
        course: `${course.dept} ${course.number} - ${course.title}`,
        section: course.section,
        units: course.units,
        startTime: formatTime(course.startTime),
        endTime: formatTime(course.endTime),
        days: course.days.join('/'),
        location: course.location,
        designation: course.designation,
        additionalReq: course.additionalReq,
      })),
    [currentCourses, userID]
  )

  // table rerendering bc tableData is changing
  const [tableData, setTableData] = useState(courses)

  useEffect(() => {
    setTableData(courses)
  }, [currentCourses, courses])

  useEffect(() => {
    async function markAsComplete() {
      console.log(courseData)
      try {
        // TODO: success alert
        const res = await addCompletedCourse(courseData)
        // why is res undefined
        // if (res.data.success === true) {
        //   setSuccess(true)
        //   setSeverity('success')
        //   setOpen(true)
        //   setIsLoading(false)
        // }
      } catch (error) {
        console.log(error)
        // setSeverity('error')
        // setOpen(true)
        // setError(error.message)
      }
    }
    markAsComplete()
  }, [courseData])

  const totalUnits = currentCourses.reduce((sum, obj) => sum + obj.units, 0)

  const handleMenuClick = (event, rowData) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(rowData)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  const handleDialogConfirm = async () => {
    // delete server side
    deleteCurrentCourse(selectedRow)

    // delete from current
    const valuesToRemove = []
    let dataDelete = [...tableData]
    valuesToRemove.push(selectedRow)
    dataDelete = dataDelete.filter((i) => valuesToRemove.indexOf(i) === -1)
    setTableData([...dataDelete])

    // cause useEffect to add courseData to complete
    setCourseData({
      userID: JSON.parse(user).googleId,
      type: selectedRow.type,
      number: selectedRow.course.split(' ')[1],
      dept: selectedRow.course.split(' ')[0],
      title: selectedRow.course.split('- ')[1],
      units: selectedRow.units,
      term: currentTerm,
      year: currentYear,
      grade: grade,
      // only ge desig will have '-'
      designation: selectedRow.designation.split(' ').includes('-')
        ? selectedRow.designation.split(' ')[0]
        : selectedRow.designation,
      additionalReq: selectedRow.additionalReq
        ? selectedRow.additionalReq
        : 'N/A',
    })

    setOpen(false)
  }

  const handleGradeChange = (event) => {
    setGrade(event.target.value || '')
  }

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

  const handleCourseDelete = () => {
    confirm({ description: 'Delete selected course' })
      .then(() => {
        // change server side
        deleteCurrentCourse(selectedRow)

        // change client side
        const valuesToRemove = []
        let dataDelete = [...tableData]
        valuesToRemove.push(selectedRow)
        dataDelete = dataDelete.filter((i) => valuesToRemove.indexOf(i) === -1)
        setTableData([...dataDelete])

        handleMenuClose()
        setIsLoading(false)
      })
      .catch((e) => {
        if (e) {
          console.log(`error: ${e}`)
        }
        console.log('cancelled')
        handleMenuClose()
        setIsLoading(false)
      })
  }

  const handleMarkAsComplete = () => {
    setOpen(true)
    setCourseTitle(selectedRow.course)
    handleMenuClose()
  }

  return (
    <>
      <MaterialTable
        title={`Current Schedule - ${currentTerm} ${currentYear} (${totalUnits} Units)`}
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        options={{
          actionsColumnIndex: -1,
          emptyRowsWhenPaging: false,
        }}
        // TODO: refactor into menu
        // https://github.com/Domino987/material-table-blog/blob/3671ee2250e626a6c0f3a68b47dd41d3850def2c/blog/src/GroupedActions/GroupedActions.tsx#L42
        editable={{
          onRowUpdate: async (newCourse, oldCourse) =>
            new Promise((resolve, reject) => {
              setIsLoading(true)
              handleCourseUpdate(newCourse, oldCourse)
              resolve()
            }),
        }}
        actions={[
          {
            icon: MoreVertIcon,
            tooltip: 'More',
            onClick: handleMenuClick,
          },
        ]}
      />
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        keepMounted={true}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* TODO */}
        {/* <MenuItem onClick={handleCourseUpdate}>Edit</MenuItem> */}
        <MenuItem onClick={handleCourseDelete}>Delete</MenuItem>
        <MenuItem onClick={handleMarkAsComplete}>Mark As Complete</MenuItem>
      </Menu>
      {open && courseTitle ? (
        <DialogSelect
          open={open}
          handleDialogClose={handleDialogClose}
          handleDialogConfirm={handleDialogConfirm}
          courseTitle={courseTitle}
          grade={grade}
          handleGradeChange={handleGradeChange}
        />
      ) : null}
    </>
  )
}

export default CurrentSchedule
