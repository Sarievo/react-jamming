import styles from "./SearchBar.module.css"
import {useState} from "react";


const SearchBar = (props) => {
  const [term, setTerm] = useState('')
  const onInputChangeHandler = (e) => {
    setTerm(e.target.value)
  }

  return (<div className={styles["SearchBar"]}>
    <input placeholder="Enter A Song, Album, or Artist" value={term} onChange={onInputChangeHandler}/>
    <button className={styles["SearchButton"]} onClick={props.onSearch.bind(null, term)}>SEARCH</button>
  </div>)
}

export default SearchBar;