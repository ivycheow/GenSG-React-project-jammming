import React from "react";

import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

// takes in an object of props - onNameChange, playlistTracks, onRemove, onSave
const Playlist = ( {onNameChange, playlistTracks, onRemove, onSave} ) => {
    // event hander (handleNameChange) - extract target property from the object and calls onNameChange 
  const handleNameChange = ({ target }) => onNameChange(target.value);

  return (
    <div className="Playlist">
        {/* for users to input name of the platlist */}
        <input onChange={handleNameChange} defaultValue={"New Playlist"}></input>
        <TrackList 
            // contains the list of tracks to be displayed
            tracks={playlistTracks}
            // a boolean prop set to true and to determine whether a track can be removed 
            isRemoval={true}
            // to remove a track from the playlist
            onRemove={onRemove}
        />
        {/* button for user to save the track into playlist */}
        <button 
            className="savePlaylist"
            onClick={onSave}>
                Save to Spotify
        </button>
    </div>
  );
};

export default Playlist;
