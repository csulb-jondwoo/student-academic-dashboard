import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import StudentInfo from '../../components/StudentInfo/StudentInfo';
import CurrentSchedule from '../../components/Tables/CurrentSchedule/CurrentSchedule';
import MajorRemaining from '../../components/Tables/RemainingCourses/MajorRemaining/MajorRemaining';
import MajorRequirements from '../../components/Tables/Requirements/MajorRequirements/MajorRequirements';
import GeRemaining from '../../components/Tables/RemainingCourses/GeRemaining/GeRemaining';
import GeRequirements from '../../components/Tables/Requirements/GeRequirements/GeRequirements';
import { majorReqCategory } from '../../components/Tables/Requirements/MajorRequirements/CecsReqData';

const Dashboard = () => {
  const [radioValue, setRadioValue] = useState('ge');

  const handleCourseChange = (value) => {
    setRadioValue(value);
  };

  return (
    <>
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
        <Col className="d-flex justify-content-center">
          <ToggleButtonGroup
            className="mb-3"
            type="radio"
            name="options"
            defaultValue="ge"
            onChange={handleCourseChange}
          >
            <ToggleButton value="ge">GE</ToggleButton>
            <ToggleButton value="major">Major</ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row className="mt-3 mb-5">
        <Col>{radioValue === 'ge' ? <GeRemaining /> : <MajorRemaining />}</Col>
        <Col>
          {radioValue === 'ge' ? <GeRequirements /> : <MajorRequirements />}
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
