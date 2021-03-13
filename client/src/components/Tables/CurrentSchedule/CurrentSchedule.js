import React, { useCallback, useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import MaterialTable, { MTableToolbar } from 'material-table';

import '../../../utility/css/table-fixed-height.css';
import CurrentCourse from './Course/Course';
import { myContext } from '../../../context/Context';

const CurrentSchedule = () => {
  const { getCurrentCourses, currentCourses, user } = useContext(myContext);

  const [columns, setColumns] = useState([
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
  ]);

  // const [data, setData] = useState([
  //   {
  //     course: 'CECS 100 - Intro to Technology',
  //     section: 3,
  //     units: 3,
  //     time: '12:00pm - 2:00pm',
  //     days: 'Mon / Wed',
  //     location: 'Online',
  //   },
  //   {
  //     course: 'CECS 100 - Intro to Technology',
  //     section: 3,
  //     units: 3,
  //     time: '12:00pm - 2:00pm',
  //     days: 'Mon / Wed',
  //     location: 'Online',
  //   },
  // ]);
  const [data, setData] = useState(currentCourses);

  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    getCurrentCourses(userID);
  }, [getCurrentCourses, userID]);

  console.log(currentCourses);

  const formatDate = (date) => {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var dd = 'AM';
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = 'PM';
    }
    if (h === 0) {
      h = 12;
    }

    var replacement = h + ':' + m;
    replacement += ' ' + dd;

    return replacement;
  };

  // accumulate total number of units
  const totalUnits = currentCourses.reduce((sum, obj) => {
    return sum + obj.units;
  }, 0);

  // const handleUpdate = (params) => {
  //   alert('You want to edit ' + data.length + ' rows');
  // };

  const handleDelete = (oldData) => {};

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
          //       const dataDelete = [...data];
          //       const index = oldData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setData([...dataDelete]);
          //       resolve();
          //     }, 1000);
          //   }),
        }
      }
      actions={[
        // {
        //   tooltip: 'Edit All Selected Users',
        //   icon: 'edit',
        //   onClick: (evt, data) => handleUpdate(evt, data),
        // },
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
