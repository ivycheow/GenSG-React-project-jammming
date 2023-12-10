import React from 'react';

import './TrackList.css';
import Track from '../Track/Track';

// takes in an object of props - tracks, onAdd, isRemoval, onRemove
const TrackList = ({tracks, onAdd, isRemoval, onRemove}) => {
    return(
        <div className='trackList'>
            {/* map to iterate over the tracks array - for each track, a Tracj component is rendered */}
            {tracks.map((track) => {
                return(
                    <Track 
                    // to set unique id for each track 
                    key={track.id}
                    // to pass all the props to the Track component 
                    {...{track, onAdd, isRemoval, onRemove}}
                />
                )
            })}
        </div>
    )
}  

export default TrackList;