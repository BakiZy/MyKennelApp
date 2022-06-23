import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import axios from "axios";
import PoodleList from "../components/Poodles/PoodlesList";
import PoodleFilter from "../components/Poodles/PoodleFilter";

import Layout from "../components/UI/Layout";
import NotFound from "./NotFound";
import classes from "./Home.module.css";
import Button from "../components/UI/Button";
import { clear } from "@testing-library/user-event/dist/clear";

const Home = () => {
  const [poodlesList, setPoodlesList] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [loaded, setIsLoaded] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const filterHandler = (filterData) => {
    const data = {
      ...filterData,
    };
    setPoodlesList(filterData);
  };

  useEffect(() => {
    axios
      .get("https://localhost:44373/api/poodles")
      .then((response) => {
        const loadedData = [];
        const responseData = response.data;
        // console.log(response.data);
        for (const key in responseData) {
          loadedData.push({
            key: key,
            id: responseData[key].id,
            name: responseData[key].name,
            dateOfBirth: responseData[key].dateOfBirth,
            geneticTests: responseData[key].geneticTests,
            pedigreeNumber: responseData[key].pedigreeNumber,
            poodleSizeName: responseData[key].poodleSizeName,
            poodleColorName: responseData[key].poodleColorName,
            image: responseData[key].image,
          });
        }
        setPoodlesList(loadedData);
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const onRemoveHandler = (id) => {
    navigate(`/poodle/${id}`);
  };

  if (error) {
    setError(true);
    return <NotFound />;
  }

  // setState((prvestate) => {
  //   return {...prevstate, nekideostatea: "nesto"};
  // })

  const NameFilter = (props) => {
    const nameInputRef = useRef();
    const searchFilter = useCallback((event) => {
      event.preventDefault();
      const enteredName = nameInputRef.current.value;
      console.log(enteredName);
      axios
        .get("https://localhost:44373/api/filters/search-by-name", {
          params: { name: enteredName },
        })
        .then((response) => {
          const responseData = response.data;
          const loadedData = [];
          for (const key in responseData) {
            loadedData.push({
              key: key,
              id: responseData[key].id,
              name: responseData[key].name,
              dateOfBirth: responseData[key].dateOfBirth,
              geneticTests: responseData[key].geneticTests,
              pedigreeNumber: responseData[key].pedigreeNumber,
              poodleSizeName: responseData[key].poodleSizeName,
              poodleColorName: responseData[key].poodleColorName,
              image: responseData[key].image,
            });
          }
          setPoodlesList(loadedData);
          setFilterLoading(false);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const clearHandler = () => {};
    return (
      <form onSubmit={searchFilter}>
        <div className={classes.controlNameFilter}>
          <label
            htmlFor="searchByNameFilter"
            className={classes.filterNameLabel}
          >
            Enter name of a dog to search:
          </label>

          <input
            type="text"
            id="searchByNameFilter"
            name="searchByNameFilter"
            ref={nameInputRef}
          />
        </div>
        <div className={classes.nameFilter}>
          <button className={classes.searchNameButton}>Search by name</button>
          <Button onClick={clearHandler} className={classes.clearButton}>
            Clear filter
          </Button>
        </div>
      </form>
    );
  };

  const clearHandler = () => {};

  return (
    <Layout>
      <div className={classes.filters}>
        <PoodleFilter onFilter={filterHandler} />
        <NameFilter onClick={clearHandler} />
      </div>
      <h1>Von Apalusso squad</h1>
      <PoodleList poodles={poodlesList} onEdit={onRemoveHandler} />
    </Layout>
  );
};

export default Home;
