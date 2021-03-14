import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';

import formatTime from '../../../utility/formatTime/formatTime';
import { myContext } from '../../../context/Context';

import '../../../utility/css/table-fixed-height.css';
import PrivateRoute from '../../AppRoutes/PrivateRoute/PrivateRoute';
import CurrentCourseForm from '../../Forms/CurrentCourseForm/CurrentCourseForm';

const CurrentSchedule = () => {
  const history = useHistory();

  const { getCurrentCourses, currentCourses, user } = useContext(myContext);

  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    // set state of currentCourses inside context via reducer
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

  const [data, setData] = useState([]);

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

  const totalUnits = currentCourses.reduce((sum, obj) => {
    return sum + obj.units;
  }, 0);

  const handleUpdate = (data) => {
    history.push({ pathname: 'add-current-course', state: data });

    // alert('You want to edit ' + data.length + ' rows');
  };

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
      }}
      // detailPanel={(rowData) => {
      //   return <p>test</p>;
      // }}
      // editable={
      //   {
      //     // onRowAdd: async (newData) => await setData([...data, newData]),
      //     // onRowUpdate: (newData, oldData) =>
      //     //   new Promise((resolve, reject) => {
      //     //     setTimeout(() => {
      //     //       const dataDelete = [...data];
      //     //       const index = oldData.tableData.id;
      //     //       dataDelete.splice(index, 1);
      //     //       setData([...dataDelete]);
      //     //       resolve();
      //     //     }, 1000);
      //     //   }),
      //     // onRowDelete: (oldData) =>
      //     //   new Promise((resolve, reject) => {
      //     //     setTimeout(() => {
      //     //       const dataDelete = [...courses];
      //     //       const index = oldData.tableData.id;
      //     //       console.log(index);
      //     //       dataDelete.splice(index, 1);
      //     //       setData([...dataDelete]);
      //     //       resolve();
      //     //     }, 1000);
      //     //   }),
      //   }
      // }
      actions={[
        {
          tooltip: 'Edit',
          icon: 'edit',
          onClick: (evt, data) => handleUpdate(data),
        },
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
