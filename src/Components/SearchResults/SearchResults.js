import styles from "./SearchResults.module.css"
import TrackList from "../TrackList/TrackList";

const SearchResults = props => {
  return (<div className={styles["SearchResults"]}>
    <h2>Results</h2>
    <TrackList tracks={props.tracks} action={props.onAdd} isRemoval={false}/>
  </div>)
}

export default SearchResults