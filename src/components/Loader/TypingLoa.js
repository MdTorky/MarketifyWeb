import React from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const TypingLoader = () => {
    return (
        <div className="TypingLoader">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <p className="TypingLoaderTriangle"><FontAwesomeIcon icon={faPlay} /></p>
        </div>

    )
}

export default TypingLoader
