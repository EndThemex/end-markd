import React, {useState, useEffect, useRef} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";
import useKeyPress from "../hooks/useKeyPress";

const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')

    const entetPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const node = useRef(null)

    const closeSearch = () => {
        setInputActive(false)
        setValue('')
    }

    useEffect(() => {
        if (entetPressed && inputActive) {
            onFileSearch(value)
        }
        if (escPressed && inputActive) {
            closeSearch()
        }
    })

    useEffect(() => {
        if (inputActive){
            node.current.focus()
        }
    })

    return (
        <div className="alert alert-primary d-flex justify-content-between align-items-center">
            {
                !inputActive &&
                <>
                    <span>{title}</span>
                    <button type="button" className="icon-button" 
                        onClick={() => {setInputActive(true)}}>
                            <FontAwesomeIcon title="搜索" icon={faSearch} />
                    </button>
                </>
            }
            {
                inputActive &&
                <>
                    <div className="">
                        <input className="form-control" 
                            value={value} 
                            ref={node}
                            onChange={(e) => {setValue(e.target.value)}} />
                    </div>
                    <button type="button" className="icon-button" 
                        onClick={() => {setInputActive(false)}}>
                            <FontAwesomeIcon title="关闭" icon={faXmark} />
                        </button>
                </>
            }
        </div>
    )
}

FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired
}

FileSearch.defaultProps = {
    title: "我的云文档"
}

export default FileSearch