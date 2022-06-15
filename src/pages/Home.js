import { useState, useEffect } from "react";
import axios from "axios";
import PoodleList from "../components/Poodles/PoodlesList";
import Layout from "../components/UI/Layout";

const Home = () => {
  return (
    <section>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2em",
          textAlignLast: "center",
        }}
      >
        Welcome to Von Apalusso kennel page
      </h1>
      <Layout></Layout>
    </section>
  );
};

export default Home;
