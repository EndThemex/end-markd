import React, { useEffect, useRef, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMarkdown} from '@fortawesome/free-brands-svg-icons'
import {faEdit, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons'
import {PropTypes} from 'prop-types'
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {

    const [editState, setEditState] = useState(false)
    const [value, setValue] = useState('')
    const inputRef = useRef(null);
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const closeInput = (editItem) => {
        setEditState(false)
        setValue('')
        if (editItem.isNew) {
            onFileDelete(editItem.id)
        }
    }

    useEffect(() => {
        if (enterPressed && editState && value){
            const editItem = files.find(file => file.id === editState)
            onSaveEdit(editItem.id, value, editItem.isNew)
            setEditState(false)
            setValue('')
        }
        
        if (escPressed && editState){
            const editItem = files.find(file => file.id === editState)
            closeInput(editItem)
        }

        if (editState) {
            inputRef.current.focus()
        }
    })

    useEffect(() => {
        const newFile = files.find(file => file.isNew);
        if (newFile) {
            setEditState(newFile.id);
            setValue('');
        }
    }, [files])

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li
                        className="list-group-item bg-light row d-flex align-items-center"
                        key={file.id}
                    >
                        { 
                            ((file.id !== editState) && !file.isNew) &&
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
                            ((file.id === editState) || file.isNew) &&
                            <>
                                <input className="col-10" 
                                    value={value}
                                    ref={inputRef}
                                    placeholder="请输入文件名称"
                                    onChange={(e) => {setValue(e.target.value)}} />
                                <button className="col-1 icon-button"
                                    onClick={() => closeInput(file)}>
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