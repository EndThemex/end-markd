import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faTimes, faPlus} from '@fortawesome/free-solid-svg-icons'
import './TabList.scss'

const TabList = ({files, activeId, unsaveIds, onTabClick, onCloseTab}) => {

    const [isHover, setHover] = useState(false);

    const hoverHandler = (e) => {
        console.log(e);
        setHover(true);
    }

    // useEffect(() => {
    //     document.addEventListener('', hoverHandler)
    //     return () => {
    //         document.removeEventListener('focus', hoverHandler)
    //     }
    // }, [])

    return (
    <ul className="nav nav-pills tablelist-component">
        {files.map(file => {

            const tabClassName = classNames(
                {
                    'nav-link': true,
                    'active': activeId === file.id
                }
            )
            
            const withUnsavedMark = unsaveIds.includes(file.id)
            const iconClassName = classNames(
                {
                    'ms-2': true,
                    'close-icon': withUnsavedMark,
                    'unsave-icon': withUnsavedMark,
                }
            )
            const icon = withUnsavedMark ? faCircle : faTimes;
            console.log(icon);

            return (
                <li className="nav-item" key={file.id} >
                    <a className={tabClassName} href="#"
                      onClick={(e) => {e.preventDefault(); onTabClick(file.id)}}>
                        {file.title}
                        
                        <span className={iconClassName}>
                            <FontAwesomeIcon 
                              className="" title="Delete" icon={icon} 
                              onClick={(e) => {e.stopPropagation(); onCloseTab(file.id)}}
                            />
                        </span>
                    </a>
                </li>
            )
        })}
    </ul>
    )
}

TabList.propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.string,
}

export default TabList