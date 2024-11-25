import React from 'react'
import PDFUpload from './PDFUpload'
import PDFView from './PDFView'

function ResourcePDF() {
  return (
    <div>
        <span>
        ResourcePDF
        </span>
        <div>
            <PDFUpload/>
            {/* <BooksList/> */}
            <PDFView/>
        </div>
    </div>
  )
}

export default ResourcePDF