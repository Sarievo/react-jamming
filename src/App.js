import styles from './App.module.css';
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import {useState} from "react"
import Spotify from "./util/Spotify";


const App = () => {
  const [fetchedTracks, setFetchedTracks] = useState([])
  const [savedTracks, setSavedTracks] = useState([])
  const [playlistName, setPlaylistName] = useState("New Playlist")

  const addTrack = (track) => {
    for (const present_track of savedTracks) {
      if (track.id === present_track.id) return
    }
    setSavedTracks(prevTracks => [...prevTracks, track])
  }

  const removeTrack = (track) => {
    const newSavedTracks = savedTracks.filter(it => it.id !== track.id)
    setSavedTracks(newSavedTracks)
  }

  const changePlaylistName = (name) => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    Spotify.savePlaylist(playlistName, savedTracks.map(it => it.uri)).then(() => {
      setPlaylistName('New Playlist')
      setSavedTracks([])
      alert('Success')
    })
  }

  const search = (term) => {
    // console.log(term)
    Spotify.search(term).then(searchResults => {
      console.log(searchResults)
      setFetchedTracks(searchResults)
    })
  }

  return (
    <div>
      <h1>Ja<span className={styles["highlight"]}>mmm</span>ing</h1>
      <div className={styles["App"]}>
        <SearchBar onSearch={search}/>
        <div className={styles["App-playlist"]}>
          <SearchResults tracks={fetchedTracks} isRemoval={false} onAdd={addTrack}/>
          <Playlist name={playlistName} tracks={savedTracks} isRemoval={true} onRemove={removeTrack}
                    onChangeName={changePlaylistName} onSave={savePlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
