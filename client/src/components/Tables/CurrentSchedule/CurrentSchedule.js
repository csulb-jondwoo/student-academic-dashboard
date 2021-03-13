import React, { useCallback, useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import MaterialTable, { MTableToolbar } from 'material-table';

import '../../../utility/css/table-fixed-height.css';
import CurrentCourse from './Course/Course';
import { myContext } from '../../../context/Context';

const CurrentSchedule = () => {
  const {
    getCurrentCourses,
    getCompletedCourses,
    currentCourses,
    completedCourses,
    user,
  } = useContext(myContext);

  const [columns, setColumns] = useState([
    {
      title: 'Course',
      field: 'course',
      cellStyle: {
        whiteSpace: 'nowrap',
      },
    },
    {
      title: 'Section',
      field: 'section',
    },
    {
      title: 'Units',
      field: 'units',
      width: 10,
    },
    {
      title: 'Time',
      field: 'time',
    },
    {
      title: 'Days',
      field: 'days',
    },
    {
      title: 'Location',
      field: 'location',
    },
  ]);

  const [data, setData] = useState([
    {
      course: 'CECS 100 - Intro to Technology',
      section: 3,
      units: 3,
      time: '12:00pm - 2:00pm',
      days: 'Mon / Wed',
      location: 'Online',
    },
    {
      course: 'CECS 100 - Intro to Technology',
      section: 3,
      units: 3,
      time: '12:00pm - 2:00pm',
      days: 'Mon / Wed',
      location: 'Online',
    },
    {
      course: 'CECS 100 - Intro to Technology',
      section: 3,
      units: 3,
      time: '12:00pm - 2:00pm',
      days: 'Mon / Wed',
      location: 'Online',
    },
    {
      course: 'CECS 100 - Intro to Technology',
      section: 3,
      units: 3,
      time: '12:00pm - 2:00pm',
      days: 'Mon / Wed',
      location: 'Online',
    },
    {
      course: 'CECS 100 - Intro to Technology',
      section: 3,
      units: 3,
      time: '12:00pm - 2:00pm',
      days: 'Mon / Wed',
      location: 'Online',
    },
    {
      course: 'CECS 100 - Intro to Technology',
      section: 3,
      units: 3,
      time: '12:00pm - 2:00pm',
      days: 'Mon / Wed',
      location: 'Online',
    },
    {
      course: 'CECS 100 - Intro to Technology',
      section: 3,
      units: 3,
      time: '12:00pm - 2:00pm',
      days: 'Mon / Wed',
      location: 'Online',
    },
    {
      course: 'CECS 100 - Intro to Technology',
      section: 3,
      units: 3,
      time: '12:00pm - 2:00pm',
      days: 'Mon / Wed',
      location: 'Online',
    },
  ]);

  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    getCurrentCourses(userID);
    // getCompletedCourses(userID);
  }, [getCurrentCourses, userID]);

  // accumulate total number of units
  const totalUnits = currentCourses.reduce((sum, obj) => {
    return sum + obj.units;
  }, 0);

  const handleUpdate = (params) => {
    alert('You want to edit ' + data.length + ' rows');
  };

  const handleDelete = (params) => {
    alert('You want to delete ' + data.length + ' rows');
  };

  return (
    <MaterialTable
      title={`Current Schedule - Spring 2021 (${totalUnits} Units)`}
      columns={columns.map((c) => ({ ...c, tableData: undefined }))}
      data={data}
      options={{
        selection: true,
        actionsColumnIndex: -1,
      }}
      // detailPanel={(rowData) => {
      //   return <p>test</p>;
      // }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       const dataUpdate = [...data];
        //       const index = oldData.tableData.id;
        //       dataUpdate[index] = newData;
        //       setData([...dataUpdate]);

        //       resolve();
        //     }, 1000);
        //   }),
        // onRowDelete: (oldData) =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       const dataDelete = [...data];
        //       const index = oldData.tableData.id;
        //       dataDelete.splice(index, 1);
        //       setData([...dataDelete]);

        //       resolve();
        //     }, 1000);
        //   }),
      }}
      actions={[
        {
          tooltip: 'Edit All Selected Users',
          icon: 'edit',
          onClick: (evt, data) => handleUpdate(evt, data),
        },
        {
          tooltip: 'Remove All Selected Users',
          icon: 'delete',
          onClick: (evt, data) => handleDelete(evt, data),
        },
      ]}
    />
  );
};

export default CurrentSchedule;
