import React, {useState} from 'react';
import './App.css';

import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './Spotify'

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = (term) => {
    Spotify.search(term).then(setSearchResults);
  }

  const addTrack = (track) => {
    if(playlistTracks.some((savedTrack) => savedTrack.id === track.id)){
      return;
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) => 
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    )
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }

  return(
    <div>
      <div className='App'>
        <h1>
          Jammming
        </h1>
        <SearchBar onSearch={search} />
        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist} 
          /> 
        </div>
      </div>
    </div>
  )

}

export default App;
 