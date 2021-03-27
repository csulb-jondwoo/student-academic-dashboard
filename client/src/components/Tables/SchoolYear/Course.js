/* import React from 'react'
import { Link } from 'react-router-dom'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {cecsData} from '../../../assets/CecsData'

export const Course = (props) => {

    return (
        <> 
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="cecsData">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {cecsData.cecs.map(({id, units, name, url}, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <Link to={{pathname: url}}>{name}</Link>
                                        </li>
                                    )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            
        </>
    )
}
 */
