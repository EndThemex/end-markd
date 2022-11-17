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
        onFileSearch('')
    }

    useEffect(() => {
        if (entetPressed && inputActive) {
            onFileSearch(value)
        }
        if (escPressed && inputActive) {
            closeSearch()
        }
    }, [entetPressed, escPressed, inputActive])

    useEffect(() => {
        if (inputActive){
            node.current.focus()
        }
    })

    return (
        <div className="row alert alert-primary 
        justify-content-between align-items-center my-0 no-border px-1 py-2
        search-div">
            {
                !inputActive &&
                <>
                    <span className="col ms-1">{title}</span>
                    <button type="button" className="col-2 icon-button" 
                        onClick={() => {setInputActive(true);}}>
                            <FontAwesomeIcon className="ms-1" title="搜索" icon={faSearch} />
                    </button>
                </>
            }
            {
                inputActive &&
                <>
                    <div className="col">
                        <input className="form-control py-1 search-input" 
                            value={value} 
                            ref={node}
                            onChange={(e) => {setValue(e.target.value)}} />
                    </div>
                    <button type="button" className="col-2 icon-button" 
                        onClick={() => {setInputActive(false); closeSearch()}}>
                            <FontAwesomeIcon className="ms-1" title="关闭" icon={faXmark} />
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