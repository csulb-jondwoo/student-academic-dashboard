import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import SchoolYear from '../../components/Tables/SchoolYear/SchoolYear'
import { majorReqData } from '../../assets/CecsReqs'
import '../../utility/css/table-fixed-height.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import DeleteIcon from "@material-ui/icons/Delete"
import { ExportPdf } from './ExportPdf'
// import axios from 'axios'
// import { saveAs } from 'file-saver'

const Roadmap = () => {
  const [termList, setTermList] = useState({
    initialTable: {
      term: '',
      year: '',
      items: majorReqData,
    },
  })
  const [term, setTerm] = useState()
  const [year, setYear] = useState()
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  const handleTermChange = (event) => {
    setTerm(event.target.value)
  }

  const handleAddTerm = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    setValidated(true)
    setTermList((prevState) => {
      return {
        ...prevState,
        [`${term}${year}`]: {
          term: term,
          year: year,
          items: [],
        },
      }
    })
  }

  // const createAndDownloadPdf = () => {
  //   const API = axios.create({ baseURL: 'http://localhost:5000' })
  //   API.post('/create-pdf', termList)
  //     .then(() => API.get('fetch-pdf', { responseType: 'blob' }))
  //     .then((res) => {
  //       const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

  //       saveAs(pdfBlob, 'myRoadmap.pdf')
  //     })
  // }

  const onDragEnd = (result, termList, setTermList) => {
    const { source, destination } = result
    if (!destination) return

    if ((source.droppableId === destination.droppableId) === 'initialTable') {
      return
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = termList[source.droppableId]
      const destColumn = termList[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setTermList({
        ...termList,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    } else {
      const column = termList[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setTermList({
        ...termList,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    }
  }

  const handleClick = () => {
    setShow(true)
  }

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, termList, setTermList)}
    >
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
            <div className="table-wrapper row-padding">
              {/* Table Wrapper */}

              {/* Start of Draggable/Droppable Courses */}
              <Droppable droppableId={'initialTable'}>
                {(provided) => {
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {termList.initialTable.items.map((item, index) => {
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
          {Object.entries(termList)
            .filter(([key, value]) => {
              return key !== 'initialTable'
            })
            .map(([key, value], index) => {
              return (
                <Col xs={6} className="table-wrapper">
                  <Card>
                    <Card.Body>
                      <Card.Title>{`${value.term} ${value.year}`}</Card.Title>
                      <Droppable droppableId={key} key={key}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? 'lightblue'
                                  : 'white',
                                padding: 4,
                                width: 400,
                                minHeight: 280,
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
                                            userSelect: 'none',
                                            padding: 16,
                                            margin: '0 0 8px 0',
                                            minHeight: '50px',
                                            backgroundColor: snapshot.isDragging
                                              ? '#263B4A'
                                              : '#456C86',
                                            color: 'white',
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          {`${item.course} ${item.title}`}
                                        </div>
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
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
        </Row>

        {show ? <ExportPdf className="row-padding" data={termList} /> : null}

        <Row className="d-flex mt-5 justify-content-center text-center padding">
          <Col>
            <Button className="mb-4 " onClick={handleClick}>
              Create PDF Table
            </Button>
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  )
}

export default Roadmap
