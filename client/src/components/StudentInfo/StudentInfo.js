import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const StudentInfo = () => {
  const renderOverallGpaTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Overall GPA
    </Tooltip>
  );

  const renderMajorGpaTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Major GPA
    </Tooltip>
  );

  return (
    <>
      {/* student info */}
      <Row>
        <Col>
          <Card className="d-flex flex-row">
            <Col>
              <Card.Body>
                <Card.Title>014628839</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  john.smith@student.csulb.edu
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
                    overlay={renderMajorGpaTooltip}
                  >
                    <span>3.1</span>
                  </OverlayTrigger>
                  /
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderOverallGpaTooltip}
                  >
                    <span>3.3</span>
                  </OverlayTrigger>
                </Card.Subtitle>
              </Card.Body>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StudentInfo;
