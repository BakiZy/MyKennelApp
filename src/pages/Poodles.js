import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import PoodleList from "../components/Poodles/PoodlesList";

const Poodles = () => {
  const [poodlesList, setPoodlesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://localhost:44373/api/poodles")
      .then((response) => {
        const loadedData = [];
        const responseData = response.data;
        console.log(response.data);
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2em",
          textAlignLast: "center",
        }}
      >
        Von Apalusso active squad{" "}
      </h1>
      <PoodleList poodles={poodlesList} />
    </section>
  );
};

export default Poodles;
