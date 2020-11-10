import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SchoolYear from '../../components/Tables/SchoolYear/SchoolYear';

const Roadmap = () => {
  return (
    <Container>
      <Row className="d-flex mt-5 justify-content-center">
        <Col>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>CECS Roadmap</Card.Title>
              <Button size="sm">Add School Year</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <SchoolYear />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="d-flex justify-content-center">
          <Button className="mb-4">Downlad PDF</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Roadmap;
