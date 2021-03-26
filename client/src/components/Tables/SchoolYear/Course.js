import React from 'react'
import { Link } from 'react-router-dom'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {cecsData} from '../../../assets/CecsData'

export const Course = (props) => {
    return (
        <> {/* 
            <DragDropContext>
                <Droppable droppableId="cecsData">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {cecsData.cecs.map(course => {
                                return (
                                    <Draggable key={} draggableId={} index={index}>
                                    {(provided) => (

                                    )}
                                    <tr>
                                        <td><Link to={{pathname: course.url}}>{course.name}</Link></td>
                                    </tr>
                                    </Draggable>
                                )
                            })}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            */}
        </>
    )
}
