import styles from "./Search.module.css";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {useQuery} from ".././hooks/useQuery.jsx";

export function Search() {


    const query = useQuery() ;
    const search = query.get("search")
  
    
    const[searchText, setSearchText ] = useState("");
    const history = useHistory();

    useEffect(() => {
      setSearchText(search || "");
    },[search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/?search=" + searchText);
        
    }
    return (
    <form className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input className={styles.searchInput } type="text" placeholder="Search any movie..." value={searchText} onChange={(e) => {
            setSearchText(e.target.value)
        }}   />
        <button className={styles.searchButton} onClick={handleSubmit}>
          <HiSearch />
        </button>
      </div>
    </form>
  );
}
