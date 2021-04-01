import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import SchoolYear from '../../components/Tables/SchoolYear/SchoolYear'
import {cecsData} from '../../assets/CecsData'
//import {Course} from '../../components/Tables/SchoolYear/Course'
import '../../utility/css/table-fixed-height.css'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {v4} from "uuid";


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
  const [yearList, setYearList] = useState([])
  const [courses, setCourses] = useState(cecsData)

  const handleAddYear = () => {
    setYearList(yearList.concat(
      {
        id: v4(),
        term: "", 
        year: ""
      })
    )
  }

  const handleOnDragEnd = ({ source, destination }) => {
    console.log(source)
    console.log(destination)
    // out of bounds
    if (!destination) return;

    // not moved
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...courses.cecs[source.index]}

    setCourses(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev.cecs.splice(source.index, 1)
      // Adding to new items array location
      prev.cecs.splice(destination.index, 0, itemCopy)

      return prev
    })

    // if (destination.source === "")
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Container>
        {/* Title */}
        <Row className="row-padding">
          <Col>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>CECS Roadmap</Card.Title>
                { /* yearList.length === 0 ? <h1>Add a new term</h1> : <h1>you have terms added</h1> */}
                <Button onClick={handleAddYear} size="sm">Add School Year</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Catalog */}
        <Row className="d-flex mt-5 justify-content-center">
          <Col>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>CECS Course Catalog</Card.Title>
              </Card.Body>
            </Card>
            <div className="table-wrapper">
              {/* Table Wrapper */}
              <Table className="mb-3" striped hover bordered responsive="sm">
                <thead>
                  <tr>
                    <th>
                      <Row>
                        <Col>
                          Course
                        </Col>
                      </Row>
                    </th>
                    <th>Units</th>
                  </tr>
                </thead>
                {/* Start of Draggable/Droppable Courses */}
                  {courses.cecs.map(({id, units, name, url}, index) => {
                    return (
                      <Droppable key={id} droppableId={name}>
                        {(provided) => {
                          return (
                            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                              <Draggable key={id} draggableId={name} index={index}>
                                    {(provided) => (
                                        <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                          <td>
                                            <Link to={{pathname: url}} target="_blank">{name}</Link>
                                          </td>
                                          <td>{units}</td>
                                        </tr>
                                    )}
                              </Draggable>
                              {provided.placeholder}
                            </tbody>
                          )
                        }}
                      </Droppable>
                    )})}  
                {/* End of Draggable/Droppable Courses */}
              </Table>
            </div>
          </Col>
        </Row>
        {/* Add Semester/Term */}
        <Row className="mt-3 row-padding">
          <Col>
            <Card className="text-center shadow-sm">
              <Card.Body>
                {yearList.map(({id, term, year}, index) => {
                  return (
                    <Droppable key={id} droppableId={id}>
                      {(provided) => {
                        return (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Draggable key={id} draggableId={id} index={index}>
                              {(provided) => (
                                <SchoolYear provided={provided} innerRef={provided.innerRef} key={id} term={term} year={year} />
                              )}
                            </Draggable>
                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  )
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 row-padding">
          <Col className="d-flex justify-content-end">
            <Button className="mb-4">Download PDF</Button>
          </Col>
          <Col>
            <Button>Save Roadmap</Button>
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  )
}

export default Roadmap
