import React, { useContext, useEffect } from 'react';
import MaterialTable from 'material-table';

import formatTime from '../../../utility/formatTime/formatTime';
import { myContext } from '../../../context/Context';

import '../../../utility/css/table-fixed-height.css';

const CurrentSchedule = () => {
  const {
    getCurrentCourses,
    currentCourses,
    user,
    updateCurrentCourse,
  } = useContext(myContext);

  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    // set state of currentCourses inside context via reducer
    getCurrentCourses(userID);
  }, [getCurrentCourses, userID]);

  const courses = currentCourses.map((course) => {
    return {
      userID: JSON.parse(user).googleId,
      _id: course._id,
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

  console.log(courses);

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
      title: 'Start Time',
      field: 'startTime',
      width: 1000,
    },
    {
      title: 'End Time',
      field: 'endTime',
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

  const handleDelete = async (evt, data) => {
    alert('You want to edit ' + data.length + ' rows');
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
        onRowUpdate: (newCourse, oldCourse) =>
          new Promise((resolve, reject) => {
            // emulating server load time
            setTimeout(() => {
              updateCurrentCourse({ newCourse, oldCourse });
              resolve();
              // send data to db for update
            }, 1000);
          }),
        // onRowDelete: (oldData) =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       const dataDelete = [...courses];
        //       const index = oldData.tableData.id;
        //       console.log(index);
        //       dataDelete.splice(index, 1);
        //       setData([...dataDelete]);
        //       resolve();
        //     }, 1000);
        //   }),
      }}
      actions={[
        // {
        //   tooltip: 'Edit',
        //   icon: 'edit',
        //   onClick: (evt, data) => handleUpdate(data),
        // },
        {
          tooltip: 'Delete',
          icon: 'delete',
          onClick: (evt, data) => handleDelete(evt, data),
        },
      ]}
    />
  );
};

export default CurrentSchedule;
