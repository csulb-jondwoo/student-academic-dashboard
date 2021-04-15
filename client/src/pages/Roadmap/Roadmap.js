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


const Roadmap = () => {
  const [termList, setTermList] = useState({
    initialTable: {
      name: "Required CECS Courses",
      items: [majorReqData]
    }
  })
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
    setTermList(prevState => {
      return {
        ...prevState,
        [`${term}${year}`]: {
          term: term,
          year: year,
          items: []
        }
      }
    })
    /* once the termList is created, clear the "addedCourses" column */
  }

  const onDragEnd = (result, termList, setTermList) => {
    const { source, destination } = result;
    if (!destination) return;
    console.log(termList[source.droppableId])

    if (source.droppableId === destination.droppableId === "initialTable") {
      return
    }

   /*  if (source.droppableId === "initialTable" && source.droppableId !== destination.droppableId) {
      const sourceColumn = initialTab
    } */
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = termList[source.droppableId];
      const destColumn = termList[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setTermList({
        ...termList,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = termList[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setTermList({
        ...termList,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result, termList, setTermList)}>
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
        <Row className="d-flex mt-5 justify-content-center row-padding">
          <Col>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>CECS Course Catalog</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex mt-5 justify-content-center row-padding">

              <Col>
                <div className="table-wrapper row-padding">
                  {/* Table Wrapper */}
                  
                    {/* Start of Draggable/Droppable Courses */}
                    <Droppable droppableId={"initialTable"}>
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {courses.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.course}
                                  index={index}
                                  draggableId={item.course}
                                >
                                  {(provided) => {
                                    return (
                                    <ul
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <li>
                                        <Link
                                          to={{ pathname: item.url }}
                                          target="_blank"
                                        >{`${item.course} - ${item.title} - ${item.units} Units - ${item.designation}`}</Link>
                                      </li>
                                    </ul>
                                    )
                                  }}
                                </Draggable>
                              )
                            })}
                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                </div>
              </Col>

        </Row>
        <Row className="d-flex mt-5 justify-content-center row-padding">
        {Object.entries(termList).map(([key, value], index) => {
          return (
            <Col className="table-wrapper"
              key={key}
            >
              <h2>{`${value.term} ${value.year}`}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={key} key={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {value.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.course}
                              draggableId={item.course}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {`${item.course} ${item.title}`}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </Col>
          );
        })}
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
