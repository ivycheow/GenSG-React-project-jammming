import React, {useState} from 'react';

import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

// takes in an object of props - onNameChange, playlistTracks, onRemove, onSave
const Playlist = ( {onNameChange, playlistTracks, onRemove, onSave} ) => {
  const [playlistName, setPlaylistName] = useState("New Playlist");

    // event hander (handleNameChange) - extract target property from the object and calls onNameChange 
  const handleNameChange = ({ target }) => setPlaylistName(target.value);
  const handleSave = () => {
    onSave();
    setPlaylistName("New Playlist");
  }

  return (
    <div className="Playlist">
        {/* for users to input name of the platlist */}
        <input onChange={handleNameChange} value={playlistName === "New Playlist" ? "" : playlistName}></input>
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
            onClick={handleSave}>
                Save to Spotify
        </button>
    </div>
  );
};

export default Playlist;
