import styles from "./TrackList.module.css"
import Track from "../Track/Track";

const TrackList = props => {
  const symbol = props.isRemoval ? '-' : '+';
  const handleAction = (track) => {
    props.action(track)
  }

  let tracks = null
  if (props.tracks) {
    tracks = props.tracks.map(it =>
      <Track key={it.id} {...it} symbol={symbol} action={handleAction.bind(this, it)}/>)
  }

  return (<div className={styles["TrackList"]}>
    {tracks}
  </div>)
}

export default TrackList;