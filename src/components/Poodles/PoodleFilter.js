import React from "react";
import classes from "./PoodleFilter.module.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const NameFilter = (props) => {
  const [filteredList, setFilteredList] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterName, setFilterName] = useState("");

  const nameInputRef = useRef();

  const searchHandler = (e) => {
    e.preventDefault();
    setFilterLoading(true);
  };

  return (
    <div className={classes.filter}>
      <form className={classes.filter__input} onSubmit={searchHandler}>
        <label htmlFor="searchByNameFilter">enter name for search </label>
        <input
          type="text"
          id="searchByNameFilter"
          name="searchByNameFilter"
          ref={nameInputRef}
        />

        <button>Search</button>
      </form>
      <list>{(props.filter = { filteredList })}</list>
    </div>
  );
};

export default NameFilter;
