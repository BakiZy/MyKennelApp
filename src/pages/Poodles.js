import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import PoodleList from "../components/Poodles/PoodlesList";
import Layout from "../components/UI/Layout";

const Poodles = () => {
  const [poodlesList, setPoodlesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const editHandler = (id) => {
    navigate(`/poodle/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2em",
          textAlignLast: "center",
        }}
      >
        Von Apalusso active squad{" "}
      </h1>
      <PoodleList poodles={poodlesList} onEdit={editHandler} />
    </Layout>
  );
};

export default Poodles;
