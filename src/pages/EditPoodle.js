import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/UI/Layout";

const EditPoodle = () => {
  const { poodleId } = useParams();
  console.log(poodleId);
  return (
    <Layout>
      <h1>Edit Poodle</h1>
    </Layout>
  );
};

export default EditPoodle;
