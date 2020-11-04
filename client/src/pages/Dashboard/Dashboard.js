import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StudentInfo from '../../components/StudentInfo/StudentInfo';
import Progress from '../../components/Progress/Progress';
import CurrentSchedule from '../../components/CurrentSchedule/CurrentSchedule';
import MajorRemaining from '../../components/RemainingCourses/MajorRemaining/MajorRemaining';
import MajorRequirements from '../../components/Requirements/MajorRequirements/MajorRequirements';
import GeRemaining from '../../components/RemainingCourses/GeRemaining/GeRemaining';
import GeRequirements from '../../components/Requirements/GeRequirements/GeRequirements';

const Dashboard = () => {
  return (
    <>
      <StudentInfo />
      <Progress />
      <Row className="mt-4">
        <Col>
          <CurrentSchedule />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <MajorRemaining />
        </Col>
        <Col>
          <MajorRequirements />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <GeRemaining />
        </Col>
        <Col>
          <GeRequirements />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
