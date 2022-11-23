import React from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faTimes,} from '@fortawesome/free-solid-svg-icons'
import './TabList.scss'

const TabList = ({files, activeId, unsaveIds, onTabClick, onCloseTab}) => {

    return (
    <ul className="nav nav-pills tablelist-component">
        {files.map(file => {
            const withUnsavedMark = unsaveIds.includes(file.id)

            const tabClassName = classNames(
                {
                    'nav-link pe-4': true,
                    'active': activeId === file.id,
                    'with-unsave': withUnsavedMark,
                    'position-relative no-border tab-content': true
                }
            )
            
            const tabIconClassName = 'ms-2 position-absolute top-50 translate-middle';

            return (
                <li className="nav-item" key={file.id} >
                    <a className={tabClassName} href="#"
                      onClick={(e) => {e.preventDefault(); onTabClick(file.id)}}>
                        <span title={file.title} className="pe-2">
                          {file.title}
                        </span>
                        
                        <span className={'close-icon ' + tabIconClassName}>
                            <FontAwesomeIcon 
                              className="" title="Deldte" icon={faTimes} 
                              onClick={(e) => {e.stopPropagation(); onCloseTab(file.id)}}
                            />
                        </span>
                        { withUnsavedMark && 
                            <span className={'unsave-icon ' + tabIconClassName}>
                                <FontAwesomeIcon 
                                    className="" title="Delete" icon={faCircle} 
                                    onClick={(e) => {e.stopPropagation(); onCloseTab(file.id)}}
                                />
                            </span>
                        }
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