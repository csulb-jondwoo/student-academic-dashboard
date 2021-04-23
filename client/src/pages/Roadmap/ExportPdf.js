import React from "react"
import MaterialTable from 'material-table'

export const ExportPdf = (props) => {
    return (
      <MaterialTable
        title="Roadmap Export Pdf"
        columns=
        {[
          { title: 'Term', field: 'term' },
          { title: 'Year', field: 'year', type: 'numeric' },
          { title: 'Units', field: 'units', type: 'numeric' },
          { title: 'Designation', field: 'designation' },
          { title: 'URL', field: 'url'},
        ]}
        data=
        {[
            Object.entries(props.data).filter(([key, value]) => {
                return key !== "initialTable"
              }).map(([key, value]) => {
                return (
                    { term: value.term, year: value.year }
                )
            })
        ]}        
        options=
        {{
          exportButton: true
        }}
      />
    )
  }