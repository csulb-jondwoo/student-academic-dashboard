import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import SchoolYear from '../../components/Tables/SchoolYear/SchoolYear'

/*
Roadmap:

1. if user has no roadmap -> render "create a new roadmap"  
- create a "Roadmap" schema to save for the user. The roadmap object would have an array of "terms"
Each term has the year, the season, and the courses for that term. To store the term in the appropriate position, 
write a comparison loop -> find year, then spring -> summer -> fall -> winter

- create Roadmap button saves an empty Roadmap object into the DB for the user. 
- add Term button renders a new Term component with at least a select year, select term, "+ (add course)", then a surrounding Container.
Save the term, year, courses in state. When the user hits the "save" button, the roadmap is updated with the new Term in the correct position.

2. if user has a saved roadmap -> load saved roadmap into right  for editing. each term in the roadmap would have to be mapped to create a Term component
on the Roadmap page. This would be done in the useEffect, making a call to the DB to fetch whether or not the student has a roadmap.

3. Remove CECS Roadmap, remove Add School Year (should be add term at bottom)

4. Should allow user to select from dropdown (fall, winter, spring, summer), then year. 

5. "+" functionality: a modal window perhaps? new page? 
maybe populate a list of all required CECS courses on the side for the user to pick from. Have a modal window with a list of required cecs courses.
Clicking a course adds it to the term? 
- Drag & drop features where users can select from list of required cecs courses and drag them into the Term component.
- Map the cecs data (name & url) to create Course components with the link and URL for student to choose from in this list 

*/

const Roadmap = () => {
  const [yearList, setYearList] = useState([]);

  const handleAddYear = event => {
    setYearList(yearList.concat(<SchoolYear key={yearList.length} />))
  }

  return (
    <Container>
      <Row className="d-flex mt-5 justify-content-center">
        <Col>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>CECS Roadmap</Card.Title>
              <Button onClick={handleAddYear} size="sm">Add School Year</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {yearList}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="d-flex justify-content-end">
          <Button className="mb-4">Downlad PDF</Button>
        </Col>
        <Col>
          <Button>Save Roadmap</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Roadmap
