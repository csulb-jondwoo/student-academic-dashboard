import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StudentInfo from '../../components/StudentInfo/StudentInfo';
import Progress from '../../components/Progress/Progress';
import CurrentSchedule from '../../components/CurrentSchedule/CurrentSchedule';
import RemainingCourses from '../../components/RemainingCourses/RemainingCourses';

const Dashboard = () => {
  return (
    <>
      <StudentInfo />
      <Progress />
      <Row className="mt-3">
        <Col md={7}>
          <CurrentSchedule />
        </Col>
        <Col>
          <RemainingCourses />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
