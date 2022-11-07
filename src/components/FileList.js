import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMarkdown} from '@fortawesome/free-brands-svg-icons'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li
                        className=" list-group-item bg-light row d-flex align-items-center"
                        key={file.id}
                    >
                        <FontAwesomeIcon className="col-1" icon={faMarkdown} /> 
                        <span className="col-7">
                            {file.title}
                        </span>
                        <button className="col-1 icon-button">
                            <FontAwesomeIcon title="Edit" icon={faEdit} /> 
                        </button>
                        <button className="col-1 icon-button">
                            <FontAwesomeIcon title="Delete" icon={faTrash} /> 
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}

export default FileList