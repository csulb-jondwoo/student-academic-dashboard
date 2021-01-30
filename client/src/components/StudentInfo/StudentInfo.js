import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Progress from '../../components/Progress/Progress';

const StudentInfo = () => {
  const renderTotalGpaTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Total GPA
    </Tooltip>
  );

  const renderCurrentGpaTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Current GPA
    </Tooltip>
  );

  const user = null;

  return (
    <>
      {/* student info */}
      <div className="shadow-sm">
        <Row>
          <Col>
            <Card className="d-flex flex-row">
              <Col>
                <Card.Body>
                  <Card.Title>{user ? user.studentID : 123456789}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {user ? user.email : 'john.smith@student.csulb.edu'}
                  </Card.Subtitle>
                </Card.Body>
              </Col>
              <Col className="d-flex">
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="d-flex justify-content-end"
                    style={{ paddingRight: '1.2rem' }}
                  >
                    GPA
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted d-flex justify-content-end pr-2">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderCurrentGpaTooltip}
                    >
                      <span>{user ? user.gpa : 3.1}</span>
                    </OverlayTrigger>
                    /
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTotalGpaTooltip}
                    >
                      <span>4.0</span>
                    </OverlayTrigger>
                  </Card.Subtitle>
                </Card.Body>
              </Col>
            </Card>
          </Col>
        </Row>
        <Progress />
      </div>
    </>
  );
};

export default StudentInfo;
