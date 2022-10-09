import styles from "./Track.module.css"

const Track = props => {
  return (<div className={styles["Track"]}>
    <div className={styles["Track-information"]}>
      <h3>{props.name}</h3>
      <p>{props.artist} | {props.album}</p>
    </div>
    <button className={styles["Track-action"]} onClick={props.action}>{props.symbol}</button>
  </div>)
}

export default Track