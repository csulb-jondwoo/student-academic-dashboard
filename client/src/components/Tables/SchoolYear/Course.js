import React from 'react'
import {Link} from "react-router-dom"

export const Course = (props) => {
    return (
        <tr>
            <td><Link to={props.url}>{props.name}</Link></td>
            {/*will need to add units*/}
        </tr>
    )
}
