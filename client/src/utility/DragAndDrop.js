import React from 'react';
import { useDropzone } from 'react-dropzone';

import './DragAndDrop.css';
/**
 * Drag and drop a file
 * @author Ryan Stehle
 */
export default function Accept(props) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: '',
  });

  const acceptedFilesItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const dragStatus = isDragAccept ? 'accept' : isDragReject ? 'reject' : '';

  return (
    <section className="container">
      <div
        className="dropzone"
        {...getRootProps({ className: `dropzone ${dragStatus}` })}
      >
        <input {...getInputProps()} />
        <span>{isDragActive ? '📂' : '📁'}</span>
        <p className="dragText">
          Drag and drop your transcipt here, or click to select file.
        </p>
      </div>
      <aside>
        <h4>Accepted file</h4>
        <ul>{acceptedFilesItems}</ul>
      </aside>
    </section>
  );
}
