import React, { useContext, useEffect, useState, useMemo } from 'react';
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

  const userID = JSON.parse(user).googleId;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // set state of currentCourses inside context via reducer
    getCurrentCourses(userID);
    setIsLoading(false);
  }, [getCurrentCourses, userID, setIsLoading]);

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
  ];

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
        };
      }),
    [currentCourses, userID]
  );

  // table rerendering bc tableData is changing
  const [tableData, setTableData] = useState(courses);

  useEffect(() => {
    setTableData(courses);
  }, [currentCourses, courses]);

  const totalUnits = currentCourses.reduce((sum, obj) => {
    return sum + obj.units;
  }, 0);

  const handleCourseUpdate = (newCourse, oldCourse) => {
    // change server side
    updateCurrentCourse({ newCourse, oldCourse });

    // change client side
    const dataUpdate = [...tableData];
    const index = oldCourse.tableData.id;
    dataUpdate[index] = newCourse;
    setTableData([...dataUpdate]);
    setIsLoading(false);
  };

  const handleCourseDelete = (data) => {
    // change server side
    deleteCurrentCourse(data);

    // change client side
    const valuesToRemove = [];
    let dataDelete = [...tableData];

    for (const oldData of data) {
      valuesToRemove.push(oldData);
    }

    dataDelete = dataDelete.filter((i) => valuesToRemove.indexOf(i) === -1);
    setTableData([...dataDelete]);

    setIsLoading(false);
  };

  const handleMarkAsComplete = (data) => {
    console.log(data);
    setIsLoading(false);
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
        onRowUpdate: async (newCourse, oldCourse) =>
          new Promise((resolve, reject) => {
            setIsLoading(true);
            handleCourseUpdate(newCourse, oldCourse);
            resolve();
          }),
      }}
      actions={[
        {
          tooltip: 'Delete',
          icon: 'delete',
          onClick: (evt, data) => {
            confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <Card className="p-5">
                    <Card.Title>
                      <h2>Are you sure?</h2>
                    </Card.Title>
                    <div className="custom-ui">
                      <Row>
                        <Col className="d-flex justify-content-center">
                          <Button
                            className="ml-auto"
                            onClick={() => {
                              setIsLoading(true);
                              handleCourseDelete(data);
                              onClose();
                            }}
                          >
                            Yes
                          </Button>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          <Button className="mr-auto" onClick={onClose}>
                            No
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                );
              },
            });
          },
        },
        {
          tooltip: 'Mark as Complete',
          icon: PlaylistAddCheckIcon,
          onClick: (evt, data) =>
            confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <Card className="p-5">
                    <Card.Title>
                      <h2>Are you sure?</h2>
                    </Card.Title>
                    <div className="custom-ui">
                      <Row>
                        <Col className="d-flex justify-content-center">
                          <Button
                            className="ml-auto"
                            onClick={() => {
                              setIsLoading(true);
                              handleMarkAsComplete(data);
                              onClose();
                            }}
                          >
                            Yes
                          </Button>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          <Button className="mr-auto" onClick={onClose}>
                            No
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                );
              },
            }),
        },
      ]}
    />
  );
};

export default CurrentSchedule;
