import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import MaterialTable from 'material-table';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { confirmAlert } from 'react-confirm-alert';

import formatTime from '../../../utility/formatTime/formatTime';
import { myContext } from '../../../context/Context';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../../utility/css/table-fixed-height.css';

const CurrentSchedule = () => {
  const {
    user,
    currentCourses,
    getCurrentCourses,
    updateCurrentCourse,
    deleteCurrentCourse,
  } = useContext(myContext);

  const [isLoading, setIsLoading] = useState(true);

  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    // set state of currentCourses inside context via reducer
    getCurrentCourses(userID);
    setIsLoading(false);
  }, [getCurrentCourses, userID, isLoading]);

  const tableData = currentCourses.map((course) => {
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
    setIsLoading(true);
    updateCurrentCourse({ newCourse, oldCourse });
    setIsLoading(false);
  };

  const handleCourseDelete = (data) => {
    setIsLoading(true);
    deleteCurrentCourse(data);
    setIsLoading(false);
  };

  const handleMarkAsComplete = (data) => {
    console.log(data);
  };

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
        onRowUpdate: (newCourse, oldCourse) =>
          new Promise((resolve, reject) => {
            // setTimeout(() => {
            handleCourseUpdate(newCourse, oldCourse);
            resolve();
            // }, 600);
          }),
      }}
      actions={[
        {
          tooltip: 'Delete',
          icon: 'delete',
          onClick: (evt, data) =>
            new Promise((resolve, reject) => {
              // setTimeout(() => {
              // confirmAlert({
              //   title: 'Confirm to delete',
              //   message: 'Are you sure to do this.',
              //   buttons: [
              //     {
              //       label: 'Yes',
              //       onClick: () => handleCourseDelete(data),
              //     },
              //     {
              //       label: 'No',
              //       onClick: () => {},
              //     },
              //   ],
              // });
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <Card className="p-5">
                      <Card.Title>
                        <h1>Are you sure?</h1>
                      </Card.Title>
                      <div className="custom-ui">
                        <Row>
                          <Col className="d-flex justify-content-center">
                            <Button
                              size="lg"
                              className="ml-auto"
                              onClick={() => {
                                handleCourseDelete(data);
                                onClose();
                              }}
                            >
                              Yes
                            </Button>
                          </Col>
                          <Col className="d-flex justify-content-center">
                            <Button
                              size="lg"
                              className="mr-auto"
                              onClick={onClose}
                            >
                              No
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  );
                },
              });
              resolve();
              // }, 600);
            }),
        },
        {
          tooltip: 'Mark as Complete',
          icon: PlaylistAddCheckIcon,
          onClick: (evt, data) => handleMarkAsComplete(data),
        },
      ]}
    />
  );
};

export default CurrentSchedule;
