import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import SchoolYear from '../../components/Tables/SchoolYear/SchoolYear'

/*
Roadmap:

1. if user has no roadmap -> render "create a new roadmap" // else load saved roadmap. 
This means I must create a "Roadmap" schema to save for the user. The roadmap object would have an array of "terms"
Each term has the year, the season, and the courses for that term.

Clicking this button renders a "road map" (or term) component with at least a select year, select term, "+ (add course)", then a surrounding Container.
Save the term, year, courses in state.

2. if user has a saved roadmap -> load saved roadmap into right  for editing. each term in the roadmap would have to be mapped to create a component
on the Roadmap page. This would be done in the useEffect, making a call to the DB to fetch whether or not the student has a roadmap.

3. Remove CECS Roadmap, remove Add School Year (should be add term at bottom)

4. Should allow user to select from dropdown (fall, winter, spring, summer), then year. 

5. "+" functionality: a modal window perhaps? new page? 
maybe populate a list of all required CECS courses on the side for the user to pick from. Have a modal window with a list of required cecs courses.
Clicking a course adds it to the term?

6. 

Additional idea
Map the cecs data (name & url) to create components with the link and URL for student to choose from in the roadmap.

*/

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
        <Col className="d-flex justify-content-end">
          <Button className="mb-4">Downlad PDF</Button>
        </Col>
        <Col>
          <Button>Add Term</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Roadmap
