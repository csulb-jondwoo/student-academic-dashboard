import React, {useContext, useEffect, } from 'react'
import { myContext } from "../../../context/Context"

const CurrentCourse = (props) => {

    return (
        <tr>
            <td>{props.courseName}</td>
            <td>{props.section}</td>
            <td>{props.units}</td>
            <td>{props.startTime} - {props.endTime} ({props.days})</td>
            <td>{props.location}</td>
        </tr>
    )
}

export default CurrentCourse
