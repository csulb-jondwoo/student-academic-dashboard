import React, { useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import formatTime from '../../../utility/formatTime/formatTime';
import { myContext } from '../../../context/Context';

import '../../../utility/css/table-fixed-height.css';

const CurrentSchedule = () => {
  const {
    getCurrentCourses,
    currentCourses,
    user,
    updateCurrentCourse,
    deleteCurrentCourse,
  } = useContext(myContext);

  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    // set state of currentCourses inside context via reducer
    getCurrentCourses(userID);
  }, [getCurrentCourses, userID]);

  const courses = currentCourses.map((course) => {
    return {
      userID: JSON.parse(user).googleId,
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
    };
  });

  const columns = [
    {
      title: 'Course',
      field: 'course',
      width: 1000,
      // cellStyle: {
      //   whiteSpace: 'nowrap',
      // },
      // editable: 'never',
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
        whiteSpace: 'nowrap',
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
  ];

  const totalUnits = currentCourses.reduce((sum, obj) => {
    return sum + obj.units;
  }, 0);

  const handleCourseUpdate = (newCourse, oldCourse) => {
    updateCurrentCourse({ newCourse, oldCourse });
  };

  const handleCourseDelete = (data) => {
    deleteCurrentCourse(data);
  };

  return (
    <MaterialTable
      title={`Current Schedule - Spring 2021 (${totalUnits} Units)`}
      // columns={columns.map((c) => ({ ...c, tableData: undefined }))}
      columns={columns}
      data={courses}
      options={{
        selection: true,
        actionsColumnIndex: -1,
        emptyRowsWhenPaging: false,
      }}
      // detailPanel={(rowData) => {
      //   return <p>test</p>;
      // }}
      editable={{
        // onRowAdd: async (newData) => await setData([...data, newData]),
        onRowUpdate: async (newCourse, oldCourse) =>
          await handleCourseUpdate(newCourse, oldCourse),
        // onRowDelete: (oldData) =>
        //   new Promise((resolve, reject) => {
        //     console.log(oldData);
        //     // const dataDelete = [...data];
        //     // const index = oldData.tableData.id;
        //     // dataDelete.splice(index, 1);
        //     // setData([...dataDelete]);

        //     resolve();
        //   }),
      }}
      actions={[
        {
          tooltip: 'Delete',
          icon: 'delete',
          onClick: (evt, data) => handleCourseDelete(data),
        },
      ]}
    />
  );
};

export default CurrentSchedule;
