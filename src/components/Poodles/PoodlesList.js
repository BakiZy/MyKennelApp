import PoodleDetail from "./PoodleDetail";
import classes from "./PoodlesList.module.css";
import React from "react";

const PoodleList = (props) => {
  const poodlesList = props.poodles.map((poodle) => {
    return (
      <PoodleDetail
        key={poodle.id}
        id={poodle.id}
        name={poodle.name}
        dateOfBirth={poodle.dateOfBirth}
        geneticTests={poodle.geneticTests}
        pedigreeNumber={poodle.pedigreeNumber}
        poodleSizeName={poodle.poodleSizeName}
        poodleColorName={poodle.poodleColorName}
        image={poodle.image}
        onEdit={props.onEdit}
        onOpen={props.onOpen}
      />
    );
  });
  return (
    <div className={classes.listItems}>
      <ul className={classes.ul}>{poodlesList}</ul>
    </div>
  );
};

export default PoodleList;
