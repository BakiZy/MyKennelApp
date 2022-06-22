import React, { useCallback, useEffect } from "react";
import classes from "./PoodleFilter.module.css";
import axios from "axios";
import { useState, useRef } from "react";

const PoodleFilter = (props) => {
  const sizeInputRef = useRef();
  const colorInputRef = useRef();

  const [sizeForm, setSizeForm] = useState({
    id: "",
    sizeName: "",
  });
  const [colorForm, setColorForm] = useState({
    id: "",
    name: "",
  });
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [loadingColors, setLoadingColors] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      await axios
        .get("https://localhost:44373/api/poodles/list-sizes")
        .then((response) => {
          const loadedData = [];
          const responseData = response.data;
          console.log(response.data);
          for (const key in responseData) {
            loadedData.push({
              key: key,
              id: responseData[key].id,
              name: responseData[key].name,
            });
          }
          setLoadingSizes(false);
          setSizes(loadedData);
        })
        .catch((err) => {
          console.log(err);
          setLoadingSizes(false);
        });
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
      setLoadingColors(true);
      await axios
        .get("https://localhost:44373/api/PoodleColors")
        .then((response) => {
          const loadedData = [];
          console.log(response.data);
          for (const key in response.data) {
            loadedData.push({
              key: key,
              id: response.data[key].id,
              name: response.data[key].name,
            });
          }
          setColors(loadedData);
          setLoadingColors(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingColors(false);
        });
    };
    fetchColors();
  }, []);

  const getFilters = useCallback(
    (event) => {
      event.preventDefault();
      setLoadingSizes(true);
      const selectedColorName = colorInputRef.current.value;
      const selectedSizeName = sizeInputRef.current.value;
      const params = {
        ColorName: selectedColorName.toString(),
        SizeName: selectedSizeName.toString(),
      };
      axios
        .get("https://localhost:44373/api/filters/filterall", { params })
        .then((response) => {
          const loadedData = [];

          console.log(response.data);
          for (const key in response.data) {
            loadedData.push({
              key: key,
              id: response.data[key].id,
              name: response.data[key].name,
              dateOfBirth: response.data[key].dateOfBirth,
              geneticTests: response.data[key].geneticTests,
              pedigreeNumber: response.data[key].pedigreeNumber,
              poodleSizeName: response.data[key].poodleSizeName,
              poodleColorName: response.data[key].poodleColorName,
              image: response.data[key].image,
            });
          }
          setLoadingSizes(false);
          setFilteredList(loadedData);
          props.onFilter(loadedData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [colorInputRef, sizeInputRef]
  );

  const SizeList = (props) => {
    return (
      <div>
        <label htmlFor="sizeName">Size</label>
        <select
          id="sizeName"
          name="sizeName"
          ref={sizeInputRef}
          value={sizeForm}
          onChange={(e) => setSizeForm(e.target.value)}
        >
          {sizes.map((size) => (
            <option id={size.id} key={size.id} value={size.name}>
              {size.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const ColorList = (props) => {
    return (
      <div>
        <label htmlFor="colorName">Color</label>
        <select
          id="colorName"
          name="colorName"
          ref={colorInputRef}
          value={colorForm}
          onChange={(e) => setColorForm(e.target.value)}
        >
          {colors.map((color) => (
            <option id={color.id} key={color.id} value={color.name}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className={classes.filter}>
      <form onSubmit={getFilters}>
        <SizeList />
        <ColorList />

        <div className={classes.actionz}>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default PoodleFilter;
