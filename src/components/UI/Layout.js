import classes from "./Layout.module.css";
import React from "react";

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
