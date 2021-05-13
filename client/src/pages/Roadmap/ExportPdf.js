import React from "react"
import MaterialTable from 'material-table'
import {Link} from 'react-router-dom'

export const ExportPdf = (props) => {

  const columns=
  [
    { title: 'Term', field: 'term' },
    { title: 'Year', field: 'year' },
    { title: 'Course', field: 'course' },
    { title: 'Title', field: 'title' },
    { title: 'Units', field: 'units', type: 'numeric' },
    { title: 'Designation', field: 'designation' },
    { title: 'URL', field: 'url'},
  ]
  
  
  const courses = Object.entries(props.data).filter(([key, value]) => {
    return key !== "initialTable"
  }).map(([key, value]) => {
    return (
      value.items.map(item => {
        return {
          term: value.term,
          year: value.year,
          course: item.course,
          title: item.title,
          units: item.units,
          designation: item.designation,
          url: <Link to={item.url}>{item.course}</Link>
        }
      })
    )
  })

  let masterList = courses[0]
  for (let i = 1; i < courses.length; i++) {
    masterList = masterList.concat(courses[i])
  }
  

  return (    
    <MaterialTable
      title="CECS Roadmap"
      columns={columns}
      data={masterList}        
      options=
      {{
        exportButton: true
      }}
    />
    
  )
}