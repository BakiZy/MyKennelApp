import classes from "./PoodleDetail.module.css";
import Layout from "../UI/Layout";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const PoodleDetail = (props) => {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  console.log(isLoggedIn);
  const dateOfBirth = new Date(props.dateOfBirth).toDateString();
  return (
    <li className={classes.poodle}>
      <Layout>
        <div className={classes.image}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <p>Date of birth : {dateOfBirth}</p>
          {props.geneticTests ? (
            <p>Genetic testings : yes</p>
          ) : (
            <p>Genetic testings : no</p>
          )}
          {isLoggedIn && <p>Pedigree number: {props.pedigreeNumber}</p>}
          <p>Size : {props.poodleSizeName}</p>
          <p>Color : {props.poodleColorName}</p>
        </div>
        <div className={classes.actions}>
          {isLoggedIn && (
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
      </Layout>
    </li>
  );
};

export default PoodleDetail;
