import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';

import formatTime from '../../../utility/formatTime/formatTime';
import { myContext } from '../../../context/Context';

import '../../../utility/css/table-fixed-height.css';

const CurrentSchedule = () => {
  const { getCurrentCourses, currentCourses, user } = useContext(myContext);

  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    getCurrentCourses(userID);
  }, [getCurrentCourses, userID]);

  const courses = currentCourses.map((course) => {
    return {
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

  // const [data, setData] = useState(courses);

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

  // const getTotalUnits = currentCourses.reduce((sum, obj) => {
  //   return sum + obj.units;
  // }, 0);

  // const handleUpdate = (params) => {
  //   alert('You want to edit ' + data.length + ' rows');
  // };

  // const handleDelete = async (evt, data) => {
  //   await setTimeout(() => {
  //     console.log(data);
  //     // const dataDelete = [...data];
  //     // const index = oldData.tableData.id;
  //     // dataDelete.splice(index, 1);
  //     // setData([...dataDelete]);
  //   }, 1000);
  // };

  return (
    <MaterialTable
      // title={`Current Schedule - Spring 2021 (${totalUnits} Units)`}
      columns={columns.map((c) => ({ ...c, tableData: undefined }))}
      data={courses}
      options={{
        selection: true,
        actionsColumnIndex: -1,
      }}
      // detailPanel={(rowData) => {
      //   return <p>test</p>;
      // }}
      editable={
        {
          // onRowAdd: async (newData) => await setData([...data, newData]),
          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataDelete = [...data];
          //       const index = oldData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setData([...dataDelete]);
          //       resolve();
          //     }, 1000);
          //   }),
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
        }
      }
      actions={
        [
          // {
          //   tooltip: 'Edit All Selected Users',
          //   icon: 'edit',
          //   onClick: (evt, data) => handleUpdate(evt, data),
          // },
          // {
          //   tooltip: 'Remove All Selected Users',
          //   icon: 'delete',
          //   onClick: (evt, data) => handleDelete(evt, data),
          // },
        ]
      }
    />
  );
};

export default CurrentSchedule;
