import React, {useState} from 'react';

import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

// takes in an object of props - onNameChange, playlistTracks, onRemove, onSave
const Playlist = ( { playlistName, onNameChange, playlistTracks, onRemove, onSave} ) => {
  const [localPlaylistName, setLocalPlaylistName] = useState(playlistName);

    // event hander (handleNameChange) - extract target property from the object and calls onNameChange 
  const handleNameChange = ({ target }) => setLocalPlaylistName(target.value);
  
  const handleSave = () => {
    const trackUris = playlistTracks.map(track => track.uri);
    
    onSave(localPlaylistName, trackUris);
    setLocalPlaylistName("New Playlist");
  }

  return (
    <div className="Playlist">
        {/* for users to input name of the platlist */}
        <input onChange={handleNameChange} value={localPlaylistName} placeholder="New Playlist"></input>
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
