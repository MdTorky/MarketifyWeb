import React from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const TypingLoader = () => {
    return (
        <div class="TypingLoader">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <p className="TypingLoaderTriangle"><FontAwesomeIcon icon={faPlay} /></p>
        </div>

    )
}

export default TypingLoader
