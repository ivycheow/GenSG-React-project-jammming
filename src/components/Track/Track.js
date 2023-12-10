import React from 'react';

import './Track.css';

const Track = (props) => {
    // to handle adding track and removing track
    const addTrack = () => {
        props.onAdd(props.track);
    } 
    const removeTrack = () => {
        props.onRemove(props.track)
    };

    const renderAction = () => {
        return(
            // if isRemoval is true, it will return removeTrack; otherwise it will return addTrack
            <button className='Track-action' onClick={props.isRemoval ? removeTrack : addTrack}>
                {/* corresponding symbol will be shown based on isRemoval boolean */}
                {props.isRemoval ? "-" : "+"}
            </button>
        )
    };

    return(
        <div className='Track'>
            <div className='Track-information'>
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album}
                </p>
            </div>
            {renderAction()}
        </div>
    )
}

export default Track;