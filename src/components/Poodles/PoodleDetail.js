import classes from "./PoodleDetail.module.css";
import Layout from "../UI/Layout";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Transition from "react-transition-group/Transition";
import { Link } from "react-router-dom";

const PoodleDetail = (props) => {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  const isAdmin = authContext.isAdmin;

  const dateOfBirth = new Date(props.dateOfBirth).toDateString();
  return (
    <Layout>
      <li className={classes.poodle}>
        <div className={classes.image}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={classes.content}>
          <Link to="">
            <h3>{props.name}</h3>
          </Link>
          <p>Date of birth : {dateOfBirth}</p>
          {props.geneticTests ? (
            <p>Genetic testings : yes</p>
          ) : (
            <p>Genetic testings : no</p>
          )}
          {isAdmin && <p>Pedigree number: {props.pedigreeNumber}</p>}
          <p>Size : {props.poodleSizeName}</p>
          <p>Color : {props.poodleColorName}</p>
        </div>
        <div className={classes.actions}>
          {isAdmin && (
            <button
              className={classes.button}
              onClick={() => props.onEdit(props.id)}
            >
              Edit
            </button>
          )}
          <button
            className={classes.button}
            onClick={() => props.onOpen(props.id)}
          >
            Interested in this poodle pups?
          </button>
        </div>
      </li>
    </Layout>
  );
};

export default PoodleDetail;
