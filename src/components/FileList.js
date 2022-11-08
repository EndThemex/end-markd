import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMarkdown} from '@fortawesome/free-brands-svg-icons'
import {faEdit, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons'
import {PropTypes} from 'prop-types'

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {

    const [editState, setEditState] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        const handleInputEvent = (event) => {
            const {keyCode} = event
            if (keyCode === 13 && editState){
                const editItem = files.find(file => file.id === editState)
                onSaveEdit(editItem.id, value)
                setEditState(false)
                setValue('')
            }
            else if (keyCode === 27 && editState){
                setEditState(false)
                setValue('')
            }
        }
        document.addEventListener('keyup', handleInputEvent)
        return () => {
            document.removeEventListener('keyup', handleInputEvent)
        }
    })

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li
                        className=" list-group-item bg-light row d-flex align-items-center"
                        key={file.id}
                    >
                        { 
                            (file.id !== editState) &&
                            <>
                                <FontAwesomeIcon className="col-1" icon={faMarkdown} /> 
                                <span className="col-7 c-link"
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