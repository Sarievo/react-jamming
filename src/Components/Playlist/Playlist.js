import styles from "./Playlist.module.css"
import TrackList from "../TrackList/TrackList";

const Playlist = props => {
  const onChangeNameHandler = (e) => {
    props.onChangeName(e.target.value)
  }
  return (<div className={styles["Playlist"]}>
    <input value={props.name} onChange={onChangeNameHandler}/>
    <TrackList tracks={props.tracks} action={props.onRemove} isRemoval={true}/>
    <button className={styles["Playlist-save"]} onClick={props.onSave}>SAVE TO SPOTIFY</button>
  </div>)
}

export default Playlist