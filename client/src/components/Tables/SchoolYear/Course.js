import React from 'react'
import {Link} from "react-router-dom"

export const Course = (props) => {
    return (
        <tr>
            <td><Link to={{pathname: props.url}} target="_blank">{props.name}</Link></td>
            {/*will need to add units*/}
        </tr>
    )
}
