import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMarkdown} from '@fortawesome/free-brands-svg-icons'
import {faEdit, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons'
import {PropTypes} from 'prop-types'
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {

    const [editState, setEditState] = useState(false)
    const [value, setValue] = useState('')

    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    useEffect(() => {
        if (enterPressed && editState){
            const editItem = files.find(file => file.id === editState)
            onSaveEdit(editItem.id, value)
            setEditState(false)
            setValue('')
        }
        
        if (escPressed && editState){
            setEditState(false)
            setValue('')
        }
    })

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li
                        className="list-group-item bg-light row d-flex align-items-center"
                        key={file.id}
                    >
                        { 
                            (file.id !== editState) &&
                            <>
                                <FontAwesomeIcon className="col-1 icon-button px-0" icon={faMarkdown} /> 
                                <span className="col c-link"
                                    title={file.title}
                                    onClick={() => {onFileClick(file.id)}}>
                                    {file.title}
                                </span>
                                <button className="col-1 icon-button"
                                    onClick={() => {setEditState(file.id); setValue(file.title);}}>
                                    <FontAwesomeIcon title="Edit" icon={faEdit} /> 
                                </button>
                                <button className="col-1 icon-button"
                                    onClick={() => {onFileDelete(file.id)}}>
                                    <FontAwesomeIcon title="Delete" icon={faTrash} /> 
                                </button>
                            </>
                        }
                        {
                            (file.id === editState) &&
                            <>
                                <input className="col-10" 
                                    value={value}
                                    onChange={(e) => {setValue(e.target.value)}} />
                                <button className="col-1 icon-button"
                                    onClick={() => {setEditState(false)}}>
                                    <FontAwesomeIcon title="Delete" icon={faXmark} /> 
                                </button>
                            </>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func
}

export default FileList