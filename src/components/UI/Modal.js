import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={classes.modal}>
      <h1>Dog </h1>
      <button className={classes.button} onClick={props.closed}>
        Close
      </button>
    </div>
  );
};
export default Modal;
