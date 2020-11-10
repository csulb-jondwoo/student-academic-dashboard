import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import StudentInfo from '../../components/StudentInfo/StudentInfo';
import CurrentSchedule from '../../components/Tables/CurrentSchedule/CurrentSchedule';
import MajorRemaining from '../../components/Tables/RemainingCourses/MajorRemaining/MajorRemaining';
import MajorRequirements from '../../components/Tables/Requirements/MajorRequirements/MajorRequirements';
import GeRemaining from '../../components/Tables/RemainingCourses/GeRemaining/GeRemaining';
import GeRequirements from '../../components/Tables/Requirements/GeRequirements/GeRequirements';

const Dashboard = () => {
  return (
    <>
      <div style={{ height: '2000px' }}>
        <Row className="mt-5">
          <Col>
            <StudentInfo />
          </Col>
        </Row>

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
        <Row className="my-5">
          <Col>
            <GeRemaining />
          </Col>
          <Col>
            <GeRequirements />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
