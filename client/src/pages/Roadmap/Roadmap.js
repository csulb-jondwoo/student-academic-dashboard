import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'
import SchoolYear from '../../components/Tables/SchoolYear/SchoolYear'
import { majorReqData } from '../../assets/CecsReqs'
import '../../utility/css/table-fixed-height.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'

const Roadmap = () => {
  const [termList, setTermList] = useState([])
  const [courses, setCourses] = useState(majorReqData)
  const [term, setTerm] = useState()
  const [year, setYear] = useState()
  const [validated, setValidated] = useState(false)

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  const handleTermChange = (event) => {
    setTerm(event.target.value)
  }

  const handleAddTerm = (e) => {
    /* will also need to first check that the term doesn't already exist */
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    setValidated(true)
    setTermList(prev => [...prev, {term: term, year: year, addedCourses: courses.addedCourses}]);
    /* once the termList is created, clear the "addedCourses" column */
  }

  const handleOnDragEnd = ({ source, destination }) => {
    // out of bounds
    if (!destination) return

    // not moved
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...courses[source.droppableId][source.index] }

    setCourses((prev) => {
      prev = { ...prev }
      // Remove from previous items array
      prev[source.droppableId].splice(source.index, 1)
      // Adding to new items array location
      prev[destination.droppableId].splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Container>
        {/* Title */}
        <Row className="d-flex mt-5 justify-content-center padding">
          <Col>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>CECS Roadmap</Card.Title>
                <SchoolYear
                  handleAddTerm={handleAddTerm}
                  handleTermChange={handleTermChange}
                  handleYearChange={handleYearChange}
                  validated={validated}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Catalog */}
        <Row className="d-flex mt-5 justify-content-center padding">
          <Col>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>CECS Course Catalog</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex mt-5 justify-content-center padding">
          {_.map(courses, (data, key) => {
            return (
              <Col>
                <div className="table-wrapper">
                  {/* Table Wrapper */}
                  <Table
                    key={key}
                    className="mb-3"
                    striped
                    hover
                    bordered
                    responsive="sm"
                    size="sm"
                  >
                    <thead>
                      <tr>
                        <th>
                          <Row>
                            <Col>Course</Col>
                          </Row>
                        </th>
                        <th>Units</th>
                        <th>Designation</th>
                      </tr>
                    </thead>
                    {/* Start of Draggable/Droppable Courses */}
                    <Droppable key={key} droppableId={key}>
                      {(provided) => {
                        return (
                          <tbody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {data.map((el, index) => {
                              return (
                                <Draggable
                                  key={el.course}
                                  index={index}
                                  draggableId={el.course}
                                >
                                  {(provided) => (
                                    <tr
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <td>
                                        <Link
                                          to={{ pathname: el.url }}
                                          target="_blank"
                                        >{`${el.course} - ${el.title}`}</Link>
                                      </td>
                                      <td>{el.units}</td>
                                      <td>{el.designation}</td>
                                    </tr>
                                  )}
                                </Draggable>
                              )
                            })}
                            {provided.placeholder}
                          </tbody>
                        )
                      }}
                    </Droppable>
                  </Table>
                </div>
              </Col>
            )
          })}
        </Row>
        <Tab.Container id="addedTerms" defaultActiveKey={`#${term}${year}`}>
          <Row className="d-flex mt-5 justify-content-center padding">
            <Col sm={4}>
              <ListGroup>
                {termList.map(({ term, year }, idx) => {
                  return (
                    <ListGroup.Item key={idx} action href={`#${term}${year}`}>
                      {`${term} ${year}`}
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {termList.map(({term, year, addedCourses}) => {
                  return (
                    <Tab.Pane eventKey={`#${term}${year}`}>
                      <ul className="white">
                        {addedCourses.map((course, index) => {
                          return (
                            <li className="white" key={index}><Link to={{ pathname: course.url }} target="_blank">{course.course} - {course.title} - {course.units}</Link></li>
                          )
                        })}
                      </ul>
                    </Tab.Pane>
                  )
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
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
