import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Roadmap = () => {
  return (
    <Container>
      <Row className="d-flex mt-5 justify-content-center">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>CECS Roadmap</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Roadmap;
