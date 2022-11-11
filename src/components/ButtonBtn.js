import React from "react";
import {PropTypes} from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'

const ButtomBtn = ({text, colorClass, icon, onBtnClick}) => (
    <>
        <button
            type="button"
            className={`btn btn-block no-border ${colorClass}`}
        >
            <FontAwesomeIcon className="me-1"
              title={text} icon={icon} /> 
            {text}
        </button>
    </>
)

ButtomBtn.propTypes = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    onBtnClick: PropTypes.func
}

ButtomBtn.defaultProps = {
    text: '按钮',
    icon: faEdit
}

export default ButtomBtn